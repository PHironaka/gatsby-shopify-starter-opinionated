import React from 'react'
import { StaticQuery, Link } from 'gatsby'
import styled from 'styled-components'
import SEO from '../components/seo'

const MainContent = styled.div`
  p {
    margin:1em 0;
  }
`

const Refund = () => (
  <StaticQuery
    query={graphql`
      query PrivacyQuery {
        allShopifyShopPolicy(filter: { title: {eq: "Privacy Policy"}}) {
          edges {
            node {
              title
              body
            }
          }
        }
      }
    `}
    render={data => (
      <>
    <SEO title="Privacy Policy" keywords={[`gatsby`, `shopify`, `application`, `react`]} />

        {data.allShopifyShopPolicy.edges.map(({ node }) => (
          <div>
            <h1> {node.title} </h1>
            <MainContent
              dangerouslySetInnerHTML={{ __html: node.body }}
            />
          </div>
        ))}
      </>
    )}
  />
)

export default Refund
