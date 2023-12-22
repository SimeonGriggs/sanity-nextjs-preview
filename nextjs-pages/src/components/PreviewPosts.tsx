// ./nextjs-pages/src/components/PreviewPosts.tsx

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from '@sanity/preview-kit'
import { postsQuery } from "@/pages";
import Posts from "./Posts";

export default function PreviewPosts({ posts = [] }: { posts: SanityDocument[] }) {
  const [data] = useLiveQuery(posts, postsQuery)

  return <Posts posts={data} />;
}