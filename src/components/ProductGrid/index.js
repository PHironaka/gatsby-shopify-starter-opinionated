import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import StoreContext from '../../context/StoreContext'
import SoldOutIcon from './soldOut'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

 const SoldOut = styled.div`
  position:absolute;
  top:0;
  right:10px;
  `

 const ProductImageAvail = styled.div`
      position: relative;
`

 const Product = styled.div`
  display: grid;
`

 const Title = styled.span`
  font-size: 1.2rem;
  font-weight:bold;
`

 const PriceTag = styled.span`
  font-size: 1rem;

`

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
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
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))


  return (
    <Grid>
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              availableForSale,
              images: [firstImage],
              variants: [firstVariant],
            },
          }) => (
            <Product key={id}>
              <ProductImageAvail>
              <Link to={`/product/${handle}/`}>
                {firstImage && firstImage.localFile && (
                  <Img
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
                
              </Link>
              <SoldOut>
                <b>{availableForSale ? '' : <SoldOutIcon />}</b> 
              </SoldOut>
              </ProductImageAvail>
              
              
              <Link to={`/product/${handle}/`}>
                <Title>{title}</Title>
              </Link>
              <PriceTag>{getPrice(firstVariant.price)}</PriceTag>
            </Product>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </Grid>
  )
}

export default ProductGrid
