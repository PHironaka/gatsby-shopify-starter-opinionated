import React from "react"
import { StaticQuery, Link } from "gatsby"
import { graphql } from "gatsby"

import Search from "../search"

const SearchBar = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <div>
        <Search searchIndex={data.siteSearchIndex.index} />
      </div>
    )}
  />
)

export default SearchBar