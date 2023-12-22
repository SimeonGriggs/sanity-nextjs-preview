// ./src/components/PostsPreview.tsx

import { SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";

import Posts from "./Posts";
import { POSTS_QUERY } from "../../sanity/lib/queries";

export default function PostsPreview({ posts = [] }: { posts: SanityDocument[] }) {
  const [data] = useLiveQuery<SanityDocument[]>(posts, POSTS_QUERY);

  return <Posts posts={data} />;
}