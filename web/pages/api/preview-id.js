import {articleByIdQuery} from '../../lib/queries'
import {previewClient} from '../../lib/sanity.server'

// In this example we show a preview at the route of the document's ID

function redirectToPreview(res, Location) {
  // Enable preview mode by setting the cookies
  res.setPreviewData({})

  // Redirect to a preview capable route
  res.writeHead(307, {Location})
  res.end()
}

export default async function previewId(req, res) {
  const {secret, _id} = req.query

  if (!secret) {
    return res.status(401).json({message: 'No secret token'})
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({message: 'Invalid secret'})
  }

  if (!_id) {
    return redirectToPreview(res, '/')
  }

  // Check if the article with the given `slug` exists
  const article = await previewClient.fetch(articleByIdQuery, {_id})

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!article) {
    return res.status(401).json({message: 'Invalid _id'})
  }

  // Redirect to the path from the fetched article
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  return redirectToPreview(res, `/id/${article._id}`)
}
