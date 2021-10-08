import React from 'react'
import PropTypes from 'prop-types'
import {groq} from 'next-sanity'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {usePreviewSubscription} from '../lib/sanity'
import {getClient} from '../lib/sanity.server'

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
 * Makes Next.js aware of all the slugs it can expect at this route
 *
 * See how we've mapped over our found slugs to add a `/` character?
 * Idea: Add these in Sanity and enforce them with validation rules :)
 * https://www.simeongriggs.dev/nextjs-sanity-slug-patterns
 */
export async function getStaticPaths() {
  const allSlugsQuery = groq`*[defined(slug.current)][].slug.current`
  const pages = await getClient().fetch(allSlugsQuery)

  return {
    paths: pages.map((slug) => `/${slug}`),
    fallback: true,
  }
}

/**
 * Fetch the data from Sanity based on the current slug
 *
 * Important: You _could_ query for just one document, like this:
 * *[slug.current == $slug][0]
 * ...but that won't return a draft document!
 * And you get a better editing experience
 * fetching draft/preview content server-side
 *
 * Also: You can ignore `preview = false` for now,
 * I'll explain "preview context" later on!
 */
export async function getStaticProps({params, preview = false}) {
  const query = groq`*[_type == "article" && slug.current == $slug]`
  const queryParams = {slug: params.slug}
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
      data: {page, query, queryParams},
    },
  }
}

/**
 * The `usePreviewSubscription` takes care of updating
 * the preview content on the client-side
 */
export default function Page({data, preview}) {
  const {asPath} = useRouter()
  const {data: previewData} = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook needs to know what we started with, to return it immediately
    // This is what it's important to fetch draft content server-side!
    initialData: data?.page,
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
