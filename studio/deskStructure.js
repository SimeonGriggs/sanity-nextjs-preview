import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'

import resolveProductionUrl from './resolveProductionUrl'

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolveProductionUrl(doc),
      })
      .title('Preview by Slug'),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolveProductionUrl(doc, `_id`),
      })
      .title('Preview by ID'),
  ])
}

export default () =>
  S.list()
    .title('Content')
    .items([S.documentTypeListItem('article')])
