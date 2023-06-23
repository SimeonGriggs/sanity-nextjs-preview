// ./nextjs-pages/src/pages/index.tsx

import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import Posts from "@/components/Posts";
import { getClient } from "../../sanity/lib/getClient";
import dynamic from "next/dynamic";
import PreviewPosts from "@/components/PreviewPosts";

const PreviewProvider = dynamic(
  () => import("../../sanity/lib/PreviewProvider")
);

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
  _id, title, slug
}`;

export const getStaticProps = async (context) => {
  const { preview = false, previewData } = context;
  const previewToken = preview ? previewData.token : ``;
  const client = getClient(previewToken);

  const data = await client.fetch(postsQuery);

  return { props: { data, preview, previewToken } };
};

export default function Home({
  data,
  preview,
  previewToken,
}: {
  data: SanityDocument[];
  preview: boolean;
  previewToken?: string;
}) {
  if (preview && previewToken) {
    return (
      <PreviewProvider previewToken={previewToken}>
        <PreviewPosts posts={data} />
        <div className="prose prose-lg px-4 prose-blue clear-both py-16 mx-auto">
          <a href="/api/exit-preview">
            Exit preview
          </a>
        </div>
      </PreviewProvider>
    );
  }

  return <Posts posts={data} />;
}
