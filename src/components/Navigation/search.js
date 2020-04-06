import React, { Component } from "react"
import {  Link } from "gatsby"
import { Index } from "elasticlunr"
import styled from 'styled-components'

const Results = styled.div`
a {
  z-index:1000;
}
`

const SearchItems = styled.ul`
  list-style:none;
  padding:0 10px;
  z-index:10;
  width:222px;
  overflow:hidden;
  background: white;
  text-align: center;

  @media screen and (max-width: 800px) {
    width:200px;
    max-width:100%;
  }

  li {
    padding:20px 0;
  }

`


// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <Results>
        <input type="text" value={this.state.query} onChange={this.search} />
        <SearchItems>
          {this.state.results.map(page => (
            <li key={page.id} >
              <Link to={"/product/" + page.path}>{page.title}</Link>
            </li>
          ))}
        </SearchItems>
      </Results>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}