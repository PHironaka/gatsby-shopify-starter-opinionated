import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import CollectionsAll from '../components/CollectionsAll'

const CollectionPage = () => (
  <>
    <SEO title="Collections" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Shop powered by Gatsby and Shopify.</p>
    <CollectionsAll />
    <Link to="/page-2/">Go to page 2</Link>
  </>
)
export default CollectionPage