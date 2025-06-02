import { client } from "@/app/lib/sanity/client";
import { SimpleHeader } from "@/app/components/SimpleHeader";
import { SimpleFooter } from "@/app/components/SimpleFooter";
import { useState } from "react";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: {
    asset: {
      _ref: string;
    };
  } | null;
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

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
                        {/* Post Date */}
                        <span className="text-gray-500 text-xs">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        
                        <h3 className="mt-3 mb-3 text-xl font-bold tracking-tight text-gray-900">
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