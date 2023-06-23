// ./nextjs-pages/src/components/Post.tsx

import Image from "next/image";
import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../sanity/lib/client";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <main className="container mx-auto prose prose-lg p-4">
        <h1>{post?.title}</h1>
        <Image
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder.image(post?.mainImage).width(300).height(300).url()}
          width={300}
          height={300}
          alt={post?.mainImage?.alt}
        />
        {post.body ? <PortableText value={post?.body} /> : null}
      </main>
    </>
  );
}