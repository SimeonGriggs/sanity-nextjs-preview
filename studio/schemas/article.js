export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'slug', options: {source: 'title'}},
    {name: 'content', type: 'text'},
  ],
}
