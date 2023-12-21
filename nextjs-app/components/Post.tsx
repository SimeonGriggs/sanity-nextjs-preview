// ./components/Post.tsx

import Image from "next/image"
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "next-sanity";

import { dataset, projectId } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

export default function Post({ post }: { post: SanityDocument }) {
  const { title, mainImage, body } = post;

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage ? (
        <Image
          className="float-left m-0 w-1/3 mr-4 rounded-lg"
          src={builder.image(mainImage).width(300).height(300).quality(80).url()}
          width={300}
          height={300}
          alt={mainImage.alt || ''}
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  );
}