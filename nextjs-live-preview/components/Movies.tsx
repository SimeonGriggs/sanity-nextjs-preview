import Link from "next/link";
import type { SanityDocument } from "@sanity/client";
import Head from "next/head";

export default function Movies({ movies }: { movies: SanityDocument[] }) {
  return (
    <>
      <Head>
        <title>{movies.length} Movies</title>
      </Head>
      <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
        {movies.map((movie) => (
          <Link
            key={movie._id}
            href={movie.slug.current}
            className="p-4 hover:bg-blue-50"
          >
            {movie.title && <h2>{movie.title}</h2>}
          </Link>
        ))}
      </main>
    </>
  );
}
