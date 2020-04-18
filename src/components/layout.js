import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import ContextProvider from '../provider/ContextProvider'
import Navigation from './Navigation'
import Footer from './footer'

const theme = {
  primarycolor: '#4c30e8',
  black: '#000',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  blueFont: '#0657F2',
  offWhite: '#EDEDED',
  maxWidth: '1200px',
  borderRadius: '5px',
}

const Wrapper = styled.div`
  grid-gap: 3em;
  padding: 0 3em;
  max-width: 1400px;
  margin: 0 auto;

  @media screen and (max-width: 1000px) {
    display: block;
    margin: 0 auto;
    padding: 0 2em;
  }
`

const GlobalStyle = createGlobalStyle`
 html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  html {
  overflow-x:hidden;
    
  }

  body {
    color: ${props => props.theme.primarycolor};
    margin:0;
    padding:0;
    border:0;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }



  

  a {
    color: ${props => props.theme.primarycolor};
    text-decoration:none;
  }

  footer {
    margin:2em 0;
  }
 

  input {

    &::-webkit-input-placeholder {
      opacity:1; /* Chrome/Opera/Safari */
    }

    &::-moz-placeholder { /* Firefox 19+ */
      opacity:1;
}
&:-ms-input-placeholder { /* IE 10+ */
  opacity:1;
}
&:-moz-placeholder { /* Firefox 18- */
  opacity:1;
}
    
  }


`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <>
        <ContextProvider>
          <GlobalStyle />
          <Navigation siteTitle={data.site.siteMetadata.title} />
          <Wrapper>
            {children}
            <Footer />
          </Wrapper>
        </ContextProvider>
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


