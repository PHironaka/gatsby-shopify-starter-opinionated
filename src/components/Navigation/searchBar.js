import React from "react"
import { StaticQuery, Link } from "gatsby"
import { graphql } from "gatsby"
import styled from 'styled-components'
import Search from "./search"

const SearchItem = styled.div`
  width:100%;
  align-self: center;

  input {
    width:100%;
  }
`
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
      <SearchItem>
        <Search searchIndex={data.siteSearchIndex.index} />
      </SearchItem>
    )}
  />
)

export default SearchBar