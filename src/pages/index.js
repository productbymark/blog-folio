import React from "react"
import { Link, graphql } from "gatsby"

import { useSiteMetadata } from "../hooks/useSiteMetadata"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const { title } = useSiteMetadata()

  return (
    <Layout location={location} title={title}>
      <SEO title="All posts" />

      <section className="featuredProjects">
        <h2>Featured Projects</h2>
        {data.folioGrp.nodes.map(({ excerpt, frontmatter, fields }) => {
          const title = frontmatter.title || fields.slug
          return (
            <article key={fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>
                  {frontmatter.date} {frontmatter.tags.join(", ")}
                </small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: frontmatter.description || excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </section>

      <section className="featuredPosts">
        <h2>Featured Posts</h2>
        {data.postGrp.nodes.map(({ excerpt, frontmatter, fields }) => {
          const title = frontmatter.title || fields.slug
          return (
            <article key={fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>
                  {frontmatter.date} {frontmatter.tags.join(", ")}
                </small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: frontmatter.description || excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    folioGrp: allMdx(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: {
        frontmatter: {
          published: { eq: true }
          category: { eq: "portfolio" }
          featured: { eq: true }
        }
      }
      limit: 3
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
          tags
        }
        fields {
          slug
        }
      }
    }

    postGrp: allMdx(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: {
        frontmatter: {
          published: { eq: true }
          category: { eq: "post" }
          featured: { eq: true }
        }
      }
      limit: 3
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`
