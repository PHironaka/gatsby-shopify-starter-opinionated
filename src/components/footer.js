import React from 'react'
import { StaticQuery, Link } from 'gatsby'
import styled from 'styled-components'

const FooterArea = styled.footer`
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-gap:1em;
  margin-top:2em;
  padding:2em 0;
`


const Footer = () => (
  <StaticQuery
    query={graphql`
      query CollectionFooterQuery {
        allShopifyCollection {
          edges {
            node {
              title
              handle
              products {
                title
                images {
                  localFile {
                    childImageSharp {
                      fixed {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <FooterArea>
        <div>
          <h3>Collections</h3>
          {data.allShopifyCollection.edges.map(({ node }) => (
            <div>
              <Link to={'/collections/' + node.handle}>{node.title}</Link>
            </div>
          ))}
        </div>

        <div>
          <h3>Legal</h3>
          <div>
              <Link to='/refund'>Refunds</Link>
            </div>
            <div>
              <Link to='/privacy-policy'>Privacy Policy</Link>
            </div>
            <div>
              <Link to='/terms-of-service'>Terms of Service</Link>
            </div>
        </div>

        <div>
          <h3>Pages</h3>
          <div>
              <Link to='/about'>About</Link>
            </div>
            <div>
              <Link to='/blog'>Privacy Policy</Link>
            </div>
           
        </div>
        
      </FooterArea>
       
    )}
  />
)

export default Footer
