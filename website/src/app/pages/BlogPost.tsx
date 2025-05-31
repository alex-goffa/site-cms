import { client } from "@/app/lib/sanity/client";
import { SimpleHeader } from "@/app/components/SimpleHeader";
import { PortableText } from "@portabletext/react";
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
        <main className="bg-white dark:bg-gray-900 min-h-screen">
          <div className="py-8 px-4 mx-auto max-w-screen-md text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
              Post not found
            </h1>
            <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
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
      <main className="bg-white dark:bg-gray-900">
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
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
              {post.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
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
          <div className="prose prose-lg max-w-none dark:prose-invert prose-primary prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 dark:prose-p:text-gray-300">
            <PortableText value={post.body} />
          </div>
        </article>
      </main>
    </>
  );
} 