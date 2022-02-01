export default function preview(req, res) {
  const {secret, slug, slugField} = req.query

  if (!secret) {
    return res.status(401).json({message: 'No secret token'})
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({message: 'Invalid secret token'})
  }

  if (!slug) {
    return res.status(401).json({message: 'No slug'})
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities

  // _id based slugs are handled by a different route
  if (slugField === `_id`) {
    res.writeHead(307, {Location: slug ? `/id/${slug}` : `/`})
    return res.end()
  }

  res.writeHead(307, {Location: slug ? `/${slug}` : `/`})
  return res.end()
}
