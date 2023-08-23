import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn,
});
