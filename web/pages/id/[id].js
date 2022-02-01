import React from 'react'
import PropTypes from 'prop-types'
import {groq} from 'next-sanity'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {usePreviewSubscription} from '../../lib/sanity'
import {getClient} from '../../lib/sanity.server'

/**
 * Helper function to return the correct version of the document
 * If we're in preview mode, it'll return the preview document
 */
function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data
  }

  if (data.length === 1) {
    return data[0]
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
  }

  return data[0]
}

/**
 * Querying by _id is a bit special, firstly we'll accept any path
 * fallback: `blocking` will render any page on-demand
 */
export function getStaticPaths() {
  return {
    paths: [],
    fallback: `blocking`,
  }
}

/**
 * When querying by _id, we need to be aware of
 * the difference between our server-side and client-side query.
 *
 * Server-side, an authenticated Sanity Client
 * will return draft + published documents...
 */
export async function getStaticProps({params, preview = false}) {
  const {id} = params
  const publishedAndDraftIds = id.startsWith(`drafts.`)
    ? [id, id.replace(`drafts.`, ``)]
    : [id, `drafts.${id}`]

  const query = groq`*[_id in $ids]`
  const queryParams = {ids: publishedAndDraftIds}
  const data = await getClient(preview).fetch(query, queryParams)

  // Escape hatch, if our query failed to return data
  if (!data) return {notFound: true}

  // Helper function to reduce all returned documents down to just one
  const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      // Pass-down the preview context
      preview,
      // Pass-down the initial content, and our query
      data: {
        page,
        query: preview ? query : null,
        queryParams: preview ? queryParams : null,
      },
    },
  }
}

/**
 * ... on the client-side, the `usePreviewSubscription` hook's
 * groq-store does some magic to "overlay" draft documents data into published documents
 *
 * So you can't actually query by a draft _id becacuse it doesn't exist!
 */
export default function Page({data, preview}) {
  const {asPath} = useRouter()
  const {data: previewData} = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook needs to know what we started with, to return it immediately
    // This is what it's important to fetch draft content server-side!
    initialData: [data?.page],
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  const page = filterDataToSingleItem(previewData, preview)

  // Notice the optional?.chaining conditionals wrapping every piece of content. This is extremely important as you can't ever rely on a single field of data existing when Editors are creating new documents. It'll be completely blank when they start!
  return (
    <div style={{maxWidth: `20rem`, padding: `1rem`}}>
      {preview && <Link href={`/api/exit-preview?slug=${asPath}`}>Preview Mode Activated!</Link>}
      {page?.title && <h1>{page.title}</h1>}
      {page?.content && <p>{page.content}</p>}
    </div>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    query: PropTypes.string,
    queryParams: PropTypes.object,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
}
