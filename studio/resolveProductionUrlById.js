// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = 'fhrv022abyx5zgmuwpc1xvj8heapkqy4rdz6kudrvsc7ywpv'

// Replace with your deployed studio when you go live
const remoteUrl = `https://your-studio.sanity.studio`
const localUrl = `http://localhost:3000`

export default function resolveProductionUrlById(doc) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl
  const {_id} = doc

  const previewUrl = new URL(baseUrl)

  previewUrl.pathname = `/api/preview-id`
  previewUrl.searchParams.set(`secret`, previewSecret)
  previewUrl.searchParams.set(`_id`, _id)

  return previewUrl.toString()
}
