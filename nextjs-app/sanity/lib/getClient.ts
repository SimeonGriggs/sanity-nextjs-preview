// ./nextjs-app/sanity/lib/getClient.ts

import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";
import { cache } from "react";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export function getClient(preview?: {token?: string}): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getCachedClient = (preview?: {token?: string}) => {
  const client = getClient(preview);

  return cache(client.fetch.bind(client));
};
