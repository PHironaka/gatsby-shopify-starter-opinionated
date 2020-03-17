import React, { useContext } from 'react'
import { graphql, Link } from 'gatsby'
import SEO from '~/components/seo'
import Img from 'gatsby-image'
import styled from 'styled-components'
import StoreContext from '~/context/StoreContext'

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
`

const Title = styled.span`
  font-size: 1.2rem;
  font-weight:bold;
`




const CollectionPage = ({ data }) => {
  const { store: {checkout} } = useContext(StoreContext)
  const collection = data.shopifyCollection

  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))

  return (
    <>
      <SEO title={collection.title} description={collection.description} />
      <div>
        <p>
          <Link to="/"> Home </Link> / {collection.title}
        </p>

        <CollectionGrid>
          {collection.products.map(node => (
            <div>
              <Link to={`/product/${node.handle}`}> 
                <Img
                  fluid={node.images[0].localFile.childImageSharp.fluid}
                  key={node.id}
                  alt={node.title}
                />
               <Title>{node.title} </Title> 
              <p>{getPrice(node.variants[0].price)}</p>

              </Link>
            </div>
          ))}
        </CollectionGrid>
      </div>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      id
      title
      handle
      description
      shopifyId
      products {
        title
        handle
        variants {
          price
        }
        images {
          originalSrc
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default CollectionPage
