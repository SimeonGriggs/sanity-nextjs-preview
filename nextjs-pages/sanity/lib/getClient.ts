// ./nextjs-pages/sanity/lib/getClient.ts

import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export function getClient(previewToken = ''): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });

  return previewToken
    ? client.withConfig({
        token: previewToken,
        useCdn: false,
        ignoreBrowserTokenWarning: true,
        perspective: 'previewDrafts'
      })
    : client;
}
