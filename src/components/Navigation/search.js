import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import styled from 'styled-components'
import ToggleContent from '../ToggleContent'
import SearchIcon from './searchIcon'

const Results = styled.div`
  a {
    z-index: 1000;
  }
`

const SearchItems = styled.ul`
  list-style: none;
  padding: 0 10px;
  z-index: 10;
  width: 400px;
  max-width: 350px;
  overflow: hidden;
  background: white;
  text-align: center;
  position: absolute;

  @media screen and (max-width: 800px) {
    width: 200px;
    max-width: 100%;
  }

  li {
    padding: 20px 0;
  }
`

const SearchItemResults = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 2em;
  margin: 1em 0;
`
const SearchBar = styled.input`
  outline: none;
  border: none;
  border-radius: 11px;
  padding: 5px 1em;

  @media screen and (max-width: 700px) {
    display:none;
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
        
              <SearchBar
                type="text"
                name="searchproducts"
                placeholder="Search products!"
                value={this.state.query}
                onChange={this.search}
                
              />
              <SearchItems>
                {this.state.results.map(page => (
                  <SearchItemResults >
                    <img src={page.image} />
                    <li key={page.id}>
                      <Link onClick={this.search} to={'product/' + page.path}>
                        {page.title}
                      </Link>
                    </li>
                  </SearchItemResults>
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
