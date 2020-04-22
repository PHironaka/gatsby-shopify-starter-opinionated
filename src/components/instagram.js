import React from 'react'
import { StaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const InstaSection = styled.div`
  margin:2em 0;
  text-align:center;

  h2 {
    margin:1em 0;
  }
`

const InstaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }  
`

const Instagram = () => (
  <StaticQuery
    query={graphql`
      query InstaQuery {
        allInstaNode(limit: 6) {
          edges {
            node {
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <InstaSection>
        <h2>Follow us @Instagram</h2>
        <InstaGrid>
        {data.allInstaNode.edges.map(({ node }) => (
          <div>
          <a
            href={`https://www.instagram.com/p/${node.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img
              fluid={node.localFile.childImageSharp.fluid}
              alt={node.id}
            />
          </a>
          </div>
          
        ))}
        </InstaGrid>
        
      </InstaSection>
    )}
  />
)

export default Instagram
