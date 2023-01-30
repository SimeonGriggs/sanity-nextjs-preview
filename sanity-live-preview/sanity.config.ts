import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { defaultDocumentNode } from './src/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'Sanity Live Preview',

  projectId: '8y8e1p98',
  dataset: 'production',

  plugins: [
    deskTool({
      defaultDocumentNode
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
