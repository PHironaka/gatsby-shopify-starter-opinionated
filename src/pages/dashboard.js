import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Amplify, { Auth, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, Connect } from 'aws-amplify-react'
import { listPostLikes } from '../graphql/queries'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from '../components/seo'
import ClientOnly from '../components/ClientOnly'

import awsConfig from '../../aws-exports'
Amplify.configure(awsConfig)

const Client = styled.div`
    h1 {
      margin:2em 0;
    }
`

const WishlistItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Dashboard = props => (
  <>
    <SEO
      title="Wishlist"
      keywords={[`gatsby`, `shopify`, `application`, `react`]}
    />
    <Client>
      <h1>Wishlist</h1>
      <WishlistItems>
        <Connect query={graphqlOperation(listPostLikes)}>
          {({ data: { listPostLikes }, loading, error }) => {
            if (error) return <h3>Error</h3>
            if (loading) return <h3>Loading...</h3>

            return listPostLikes.items.length ? (
              listPostLikes.items.map(item => {
                const { node: post } = props.data.allShopifyProduct.edges.find(
                  ({ node }) => node.id === item.postId
                )
                return post ? (
                  <div>
                    <Img
                      fluid={post.images[0].localFile.childImageSharp.fluid}
                      alt={post.title}
                    />
                    <h3 key={post.id}>
                      <Link to={`/product/${post.handle}`}>{post.title}</Link>
                    </h3>
                  </div>
                ) : null
              })
            ) : (
              <h3>No Liked Products Yet!</h3>
            )
          }}
        </Connect>
      </WishlistItems>
    </Client>
  </>
)

export default withAuthenticator(Dashboard, true)

export const query = graphql`
  {
    allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          createdAt

          images {
            id
            originalSrc
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }

          variants {
            price
          }
        }
      }
    }
  }
`
