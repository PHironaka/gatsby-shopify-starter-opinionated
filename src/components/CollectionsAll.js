import React from 'react'
import { StaticQuery, Link } from 'gatsby'

const CollectionsAll = () => (
  <StaticQuery
    query={graphql`
      query CollectionIndexQuery {
        allShopifyCollection {
          edges {
            node {
              title
              products {
                title
                images {
                  localFile {
                    childImageSharp {
                      fixed {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div>
          {data.allShopifyCollection.edges.map(({ node }) => (
              <div>
                  {node.products.title}
              </div>
            ))}
      </div>
    )}
  />
)

export default CollectionsAll
