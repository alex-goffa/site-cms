import React from "react";
import { client } from "@/app/lib/sanity/client";
import { SimpleHeader } from "@/app/components/SimpleHeader";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to generate a deterministic date that updates weekly and progresses forward
function getUpdatedDate(postId: string, baseDate?: string): Date {
  // Get the current date
  const now = new Date();
  
  // Create a base date from the provided date or a default date if none provided
  let baseDateObj: Date;
  if (baseDate) {
    baseDateObj = new Date(baseDate);
  } else {
    // If no base date, start with May 5th, 2025
    baseDateObj = new Date(2025, 4, 5); // May is month 4 (0-based)
  }
  
  // Ensure the base date is not in the future
  if (baseDateObj > now) {
    baseDateObj = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  }

  // Use the post ID to create a consistent but seemingly random offset (1-10 days)
  const hash = postId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const dayOffset = (hash % 10) + 1;
  
  // Calculate how many weeks have passed since a fixed date (Jan 1, 2025)
  const fixedPoint = new Date(2025, 0, 1);
  const weeksPassed = Math.floor((now.getTime() - fixedPoint.getTime()) / (7 * 24 * 60 * 60 * 1000));
  
  // Move the date forward by weeks passed plus the hash-based offset
  const resultDate = new Date(baseDateObj);
  resultDate.setDate(resultDate.getDate() + (weeksPassed * 7) + dayOffset);
  
  // Ensure the date doesn't go beyond today
  if (resultDate > now) {
    resultDate.setTime(now.getTime() - (1000 * 60 * 60 * 24 * (hash % 7))); // Up to 7 days before today
  }
  
  return resultDate;
}

// Helper function to format date as "May 5th, 2025"
function formatDate(dateString: string, postId: string): string {
  // Get the updated date
  const date = getUpdatedDate(postId, dateString);
  
  // Get month name
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[date.getMonth()];
  
  // Get day with ordinal suffix
  const day = date.getDate();
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';
  
  // Format the full date
  return `${month} ${day}${suffix}, ${date.getFullYear()}`;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  lastUpdated: string;
  body: any[];
  image?: any;
}

const POST_QUERY = `*[
  _type == "post" 
  && slug.current == $slug
][0]{
  _id, 
  title, 
  slug, 
  publishedAt, 
  lastUpdated,
  body,
  image
}`;

export async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await client.fetch<Post | null>(POST_QUERY, { slug: params.slug });

  if (!post) {
    return (
      <>
        <SimpleHeader />
        <main className="bg-white min-h-screen">
          <div className="py-8 px-4 mx-auto max-w-screen-md text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
              Post not found
            </h1>
            <p className="mb-8 text-lg text-gray-500">
              The post you're looking for doesn't exist.
            </p>
            <a
              href="/blog"
              className="text-primary-600 hover:underline font-medium"
            >
              ← Back to blog
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SimpleHeader />
      <main className="bg-white">
        <article className="mx-auto max-w-screen-md py-8 px-4 lg:py-16 lg:px-6">
          {/* Back link */}
          <a
            href="/blog"
            className="inline-flex items-center mb-8 text-primary-600 hover:underline font-medium"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Back to blog
          </a>

          {/* Post header */}
          <header className="mb-8">
            <h1 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
              {post.title}
            </h1>
            <p className="text-gray-500 mb-4">
              Last Updated: {formatDate(post.lastUpdated, post._id)}
            </p>
          </header>

          {/* Featured image */}
          {post.image && (
            <img
              src={urlFor(post.image).width(800).url()}
              alt={post.title}
              className="w-full mb-8 rounded-lg"
            />
          )}

          {/* Post content */}
          <div className="prose prose-lg max-w-none prose-primary prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700">
            {post.body.map((block: any) => {
              if (block._type === 'block') {
                if (block.style === 'h1') {
                  return <h1 key={block._key} className="text-3xl font-bold mt-8 mb-4">{block.children[0].text}</h1>;
                }
                if (block.style === 'h2') {
                  return <h2 key={block._key} className="text-2xl font-bold mt-6 mb-3">{block.children[0].text}</h2>;
                }
                if (block.style === 'h3') {
                  return <h3 key={block._key} className="text-xl font-bold mt-4 mb-2">{block.children[0].text}</h3>;
                }
                // Normal paragraph
                return (
                  <p key={block._key} className="mb-4">
                    {block.children.map((child: any) => {
                      if (child.marks && child.marks.includes('strong')) {
                        return <strong key={child._key}>{child.text}</strong>;
                      }
                      if (child.marks && child.marks.includes('em')) {
                        return <em key={child._key}>{child.text}</em>;
                      }
                      return <span key={child._key}>{child.text}</span>;
                    })}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </article>
      </main>
    </>
  );
} 