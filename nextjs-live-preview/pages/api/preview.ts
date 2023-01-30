// ./pages/api/preview.ts

export default function preview(req, res) {
  res.setPreviewData({});
  res.writeHead(307, { Location: "/" });
  res.end();
}
