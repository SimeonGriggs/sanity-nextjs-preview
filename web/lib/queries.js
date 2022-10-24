export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current
  }
`

export const articleByIdQuery = `
  *[_type == "article" && _id == $_id][0] {
    _id
  }
`
