// ./nextjs-pages/src/pages/api/preview.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default function preview(req: NextApiRequest, res: NextApiResponse) {
    res.setDraftMode({ enable: true })
    res.writeHead(307, { Location: '/' })
    res.end()
}