export default function exit(req, res) {
  res.clearPreviewData()

  res.writeHead(307, {Location: req?.query?.slug ?? `/`})
}
