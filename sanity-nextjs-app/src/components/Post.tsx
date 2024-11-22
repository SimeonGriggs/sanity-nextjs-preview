// src/components/Post.tsx

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { RelatedPosts } from "./RelatedPosts";
import { POST_QUERYResult } from "../../sanity.types";

export function Post({ post }: { post: NonNullable<POST_QUERYResult> }) {
  const { _id, _type, title, mainImage, body, relatedPosts } = post;

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage?.asset?._ref ? (
        <Image
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={urlFor(mainImage?.asset?._ref).width(300).height(300).url()}
          width={300}
          height={300}
          alt={title || ""}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
      {relatedPosts ? (
        <RelatedPosts
          relatedPosts={relatedPosts}
          documentId={_id}
          documentType={_type}
        />
      ) : null}
      <hr />
      <Link href="/">&larr; Return home</Link>
    </main>
  );
}
