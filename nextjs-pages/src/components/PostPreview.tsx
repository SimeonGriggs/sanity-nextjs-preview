// ./src/components/PostPreview.tsx

import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";

import { POST_QUERY } from "../../sanity/lib/queries";
import Post from "./Post";

export default function PostPreview({
  post,
  params = {},
}: {
  post: SanityDocument;
  params: QueryParams;
}) {
  const [data] = useLiveQuery<SanityDocument>(post, POST_QUERY, params);

  return <Post post={data} />;
}