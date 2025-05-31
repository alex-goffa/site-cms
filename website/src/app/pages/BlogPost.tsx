import React from "react";
import { client } from "@/app/lib/sanity/client";
import { SimpleHeader } from "@/app/components/SimpleHeader";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
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
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
              {post.title}
            </h1>
            <p className="text-gray-500">
              Published on {new Date(post.publishedAt).toLocaleDateString()}
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