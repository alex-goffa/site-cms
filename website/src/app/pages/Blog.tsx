import { client } from "@/app/lib/sanity/client";
import { SimpleHeader } from "@/app/components/SimpleHeader";
import { SimpleFooter } from "@/app/components/SimpleFooter";
import { useState } from "react";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  lastUpdated: string;
  image?: {
    asset: {
      _ref: string;
    };
  } | null;
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, lastUpdated, image}`;

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

// Helper function to generate Sanity image URL
function getImageUrl(ref: string): string {
  // If ref is empty, return empty string - let the browser handle missing images
  if (!ref) return '';
  
  try {
    // Example Sanity ref: image-e0d31d7cae4587daad48d5f4b08cd28e7c5244ac-1200x800-jpg
    
    // Extract the asset ID and format from the reference string
    const [assetType, assetId, dimensions, extension] = ref.split('-');
    
    if (assetType !== 'image' || !assetId || !extension) {
      console.warn('Invalid Sanity image reference format:', ref);
      return '';
    }
    
    // Sanity project ID from the client configuration
    const projectId = "2dg7ahdp";
    const dataset = "production";
    
    // Construct the Sanity CDN URL
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${extension}`;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
}

export async function Blog() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return (
    <>
      <SimpleHeader />
      <main className="bg-gray-50">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          {/* Hero Section */}
          <div className="mx-auto max-w-screen-md text-center mb-12">
            <h1 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900">
              SoM Academy Blog
            </h1>
            <p className="mb-8 font-light text-gray-600 sm:text-xl">
              Insights and tips on teaching mathematics to children through problem-solving approaches
            </p>

          </div>
          
          {/* Featured Post (if available) */}
          {posts.length > 0 && (
            <div className="mb-12">
              <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  <div className="md:w-2/3">
                    <div className="flex mb-4">
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Featured</span>
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
                        <a href={`/blog/${posts[0].slug.current}`} className="hover:text-primary-700 transition-colors">
                          {posts[0].title}
                        </a>
                      </h2>
                      <p className="mb-5 text-gray-600">
                        {/* Add excerpt placeholder. In a real app, you'd fetch this from the CMS */}
                        Get insights about our teaching methodology and how we approach problem-solving in mathematics education for young learners.
                      </p>
                      <div>
                        <a href={`/blog/${posts[0].slug.current}`} className="text-amber-600 hover:underline font-semibold text-sm flex items-center">
                          Read more <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <a href={`/blog/${posts[0].slug.current}`} className="block">
                      <img
                        alt="Featured blog post"
                        className="rounded-lg object-cover w-full h-64"
                        src={getImageUrl(posts[0].image?.asset?._ref || '')}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* All Posts */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-12">
            Latest Articles
          </h2>
          
          {posts.length > 0 ? (
            <div className="pt-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map((post, index) => (
                  <div key={post._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <a href={`/blog/${post.slug.current}`} className="block">
                      <img
                        className="w-full h-48 object-cover"
                        src={getImageUrl(post.image?.asset?._ref || '')}
                        alt={post.title}
                      />
                    </a>
                    <div className="p-5">
                      <div>
                        {/* Last Updated date */}
                        <div className="text-gray-500 text-xs mb-2">
                          Last Updated: {formatDate(post.lastUpdated, post._id)}
                        </div>
                        <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900">
                          <a href={`/blog/${post.slug.current}`} className="hover:text-primary-700 transition-colors">
                            {post.title}
                          </a>
                        </h3>
                        <a href={`/blog/${post.slug.current}`} className="inline-flex items-center text-sm font-medium text-amber-600 hover:underline">
                          Read more
                          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent mb-4"></div>
              <p className="text-lg text-gray-600">
                No posts yet. Create your first post in Sanity Studio!
              </p>
            </div>
          )}
        </div>
      </main>
      <SimpleFooter />
    </>
  );
} 