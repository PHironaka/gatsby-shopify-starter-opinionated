import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import CollectionsAll from '../components/CollectionsAll'

const CollectionPage = () => (
  <>
    <SEO title="Collections" keywords={[`gatsby`, `application`, `react`]} />
    <CollectionsAll />
  </>
)
export default CollectionPage