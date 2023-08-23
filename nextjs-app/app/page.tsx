// ./nextjs-app/app/pages/index.tsx

import { draftMode } from "next/headers";
import { SanityDocument } from "next-sanity";
import { postsQuery } from "@/sanity/lib/queries";
import Posts from "@/app/_components/Posts";
import PreviewPosts from "@/app/_components/PreviewPosts";
import PreviewProvider from "@/app/_components/PreviewProvider";
import { sanityFetch, token } from "@/sanity/lib/sanityFetch";

export default async function Home() {
  const isDraftMode = draftMode().isEnabled
  const posts = await sanityFetch<SanityDocument[]>({query: postsQuery});

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }

  return <Posts posts={posts} />;
}
