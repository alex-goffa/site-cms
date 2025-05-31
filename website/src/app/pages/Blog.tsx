import { client } from "@/app/lib/sanity/client";
import { SimpleHeader } from "@/app/components/SimpleHeader";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export async function Blog() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return (
    <>
      <SimpleHeader />
      <main className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Blog
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Insights and tips on teaching mathematics to children
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article
                  key={post._id}
                  className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href={`/blog/${post.slug.current}`}>{post.title}</a>
                  </h2>
                  <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                    Published on {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <a
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </article>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No posts yet. Create your first post in Sanity Studio!
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 