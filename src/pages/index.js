import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import ProductGrid from '../components/ProductGrid'
import styled from 'styled-components'

const IntroStatement = styled.div`
  margin-bottom:2em;
  position:sticky;
  top:85px;
  background:white;
  z-index:100;
  padding:10px 0;



`

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `shopify`, `application`, `react`]} />
    <IntroStatement>
      <h1>Hi shoppers!</h1>
      <p>Welcome to your new Shop powered by Gatsby and Shopify. All these products are for testing purposes and not available for sale.</p>
    </IntroStatement>
    
    <ProductGrid />
    <Link to="/collections">Go to page 2</Link>
  </>
)

export default IndexPage
