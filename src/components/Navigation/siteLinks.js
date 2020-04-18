import React from 'react'
import { StaticQuery, Link } from 'gatsby'
import styled from 'styled-components'

const NavName = styled.div`
  a {
    font-weight:bold;
    font-size:1.3em;
  }
`


const SiteLinks = () => (
  <StaticQuery
    query={graphql`
      query SiteLinkQuery {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        {data.site.siteMetadata.menuLinks.map(link => (
          <NavName   key={link.name}>
            <Link to={link.link}>{link.name}</Link>
          </NavName>
        ))}
        <NavName>
   
      <Link to="/dashboard">Dashboard</Link>
        </NavName>
      </div>
    )}
  />
)

export default SiteLinks
