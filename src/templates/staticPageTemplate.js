import React from 'react'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import styled from 'styled-components'


const PageContent = styled.div`
  p {
    margin:1em 0;
  }
  ul {
    margin: 0 3em;
  }
`

const StaticPage = ({ data }) => {
  const product = data.shopifyPage
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <div>
          <div>
            <h1>{product.title}</h1>
            <PageContent
              dangerouslySetInnerHTML={{ __html: product.body }}
            />
          </div>
      </div>
    </>
  )
}
export const query = graphql`
  query($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      id
      title
      handle
      body
      shopifyId
      
    }
  }
`

export default StaticPage
