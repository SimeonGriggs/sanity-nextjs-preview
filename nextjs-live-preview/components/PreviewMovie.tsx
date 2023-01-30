import Link from "next/link";
import { usePreview } from "../lib/sanity.preview";
import Movie from "./Movie";

export default function PreviewMovie({
  query,
  queryParams,
}: {
  query: string;
  queryParams: { [key: string]: any };
}) {
  const data = usePreview(null, query, queryParams);

  return (
    <>
      <Movie movie={data} />
      <Link
        className="bg-blue-500 p-6 text-white font-bold fixed bottom-0 right-0"
        href="/api/exit-preview"
      >
        Exit Preview
      </Link>
    </>
  );
}
