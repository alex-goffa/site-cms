import { SanityDocument } from "@sanity/client";
import { RequestInfo } from "rwsdk/worker";
import { client } from "../lib/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export async function Home({ ctx }: RequestInfo) {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
