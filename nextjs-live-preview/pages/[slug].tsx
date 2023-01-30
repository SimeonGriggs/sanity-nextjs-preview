import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { SanityDocument } from "@sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";

import { client } from "../lib/sanity.client";
import Movie from "../components/Movie";

const PreviewMovie = lazy(() => import("../components/PreviewMovie"));
const query = groq`*[_type == "movie" && slug.current == $slug][0]{
  title,
  poster,
  overview
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "movie" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const queryParams = { slug: params?.slug ?? `` };

  if (preview) {
    return { props: { preview, data: { queryParams } } };
  }

  const movie = await client.fetch(query, queryParams);

  return {
    props: {
      preview,
      data: {
        movie,
        queryParams: {},
      },
    },
  };
};

export default function Page({
  preview,
  data,
}: {
  preview: Boolean;
  data: {
    movie: SanityDocument;
    queryParams: {};
  };
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewMovie query={query} queryParams={data.queryParams} />
    </PreviewSuspense>
  ) : (
    <Movie movie={data.movie} />
  );
}
