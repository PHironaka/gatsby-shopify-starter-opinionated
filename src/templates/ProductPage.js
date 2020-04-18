// import React, { useState, useContext } from 'react'
// import { Link, graphql } from 'gatsby'
// import { Auth, API, graphqlOperation } from 'aws-amplify'
// import { Connect } from 'aws-amplify-react'
// import uuid from 'uuid'
// import SEO from '../components/seo'
// import { listProductLikes } from '../graphql/queries'
// import { createProductLike, deleteProductLike } from '../graphql/mutations'
// import styled from 'styled-components'
// import ProductForm from '../components/ProductForm'
// import SoldOut from '../components/ProductGrid/soldOut'
// import Img from 'gatsby-image'

// const GridLeft = styled.div`
//   grid-area: left;
// `

// const GridRight = styled.div`
//   grid-area: right;
// `

// const Container = styled.div`
//   margin: 0 auto;
// `
// const ImageSection = styled.div`
//   svg {
//     position: absolute;
//     top: 144px;
//     z-index: 100;
//   }
// `
// const ImageContain = styled.div`
//   margin: 1em 0;
// `

// const SizeChart = styled.div`
//   margin-top: 3em;
// `

// const TwoColumnGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 2rem 1fr;
//   grid-template-rows: 1auto;
//   grid-template-areas: 'left . right';

//   @media screen and (max-width: 800px) {
//     display: block;
//   }
// `

// const ProductTitle = styled.h1`
//   margin-bottom: 15px;
//   margin: 0 0 0.5rem;
//   line-height: 1.4;
// `

// const ProductDescription = styled.div`
//   margin-top: 40px;

//   ul {
//     margin-left: 3em;
//   }
// `

// const SizeChartButton = styled.button`
//   background: none;
//   outline: none;
//   border: 1px solid ${props => props.theme.primarycolor};
//   padding: 7px;
//   border-radius: 4px;
//   width: 120px;
//   cursor: pointer;
//   color: ${props => props.theme.primarycolor};
//   transition: all 0.3s ease 0s;

//   &:hover {
//     background: ${props => props.theme.primarycolor};
//     color: white;
//   }
// `

// const SizeChartOpen = styled.div`
//   position: fixed;
//   background: white;
//   max-width: 700px;
//   top: 30%;
//   left: 200px;
//   height: 40vh;

//   button {
//     float: right;
//   }
// `

// class ProductPageTemplate extends React.Component {
//   state = {
//     isLoggedIn: false,
//     like: null,
//   }

//   componentDidMount = async () => {
//     const product = this.props.data.shopifyProduct
//     const user = await Auth.currentAuthenticatedUser()
//     const { data } = await API.graphql(
//       graphqlOperation(listProductLikes, {
//         filter: { productId: { eq: product.id } },
//       })
//     )
//     const like = data.listProductLikes.items[0]

//     this.setState({ isLoggedIn: !!user, like })
//   }

//   toggleLike = async () => {
//     const product = this.props.data.shopifyProduct

//     if (this.state.like) {
//       await API.graphql(
//         graphqlOperation(deleteProductLike, {
//           input: { id: this.state.like.id },
//         })
//       )
//       this.setState({ like: null })
//     } else {
//       const like = {
//         productId: product.id,
//         id: uuid(),
//       }

//       await API.graphql(
//         graphqlOperation(createProductLike, {
//           input: like,
//         })
//       )
//       this.setState({ like })
//     }
//   }

//   render() {
//     const product = this.props.data.shopifyProduct
//     const { isLoggedIn, likesProduct } = this.state
//     const avaiable = product.availableForSale
//     return (
//       <>
//         <SEO title={product.title} description={product.description} />
//         <Container>
//           <TwoColumnGrid>
//             <GridLeft>
//               <p>
//                 <Link to="/"> Home </Link> / {product.title}{' '}
//               </p>
//               <ImageSection>
//                 {!avaiable && <SoldOut />}
//                 {product.images.map(image => (
//                   <ImageContain key={image.id}>
//                     <Img
//                       fluid={image.localFile.childImageSharp.fluid}
//                       key={image.id}
//                       alt={product.title}
//                     />
//                   </ImageContain>
//                 ))}
//               </ImageSection>
//             </GridLeft>
//             <GridRight>
//               <ProductTitle>{product.title}</ProductTitle>

//               {isLoggedIn && (
//           <div>
//             <button onClick={this.toggleLike}>
//               {this.state.like ? 'Unlike' : 'Like'}
//             </button>
//           </div>
//         )}

//               <ProductForm product={product} />
//               <ProductDescription
//                 dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
//               />
//             </GridRight>
//           </TwoColumnGrid>
//         </Container>
//       </>
//     )
//   }
// }

// export default ProductPageTemplate

// export const query = graphql`
//   query($handle: String!) {
//     shopifyProduct(handle: { eq: $handle }) {
//       id
//       title
//       handle
//       productType
//       tags
//       description
//       descriptionHtml
//       shopifyId
//       availableForSale
//       options {
//         id
//         name
//         values
//       }
//       variants {
//         id
//         title
//         price
//         image {
//           localFile {
//             childImageSharp {
//               fluid(maxWidth: 910) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//         availableForSale
//         shopifyId
//         selectedOptions {
//           name
//           value
//         }
//       }
//       priceRange {
//         minVariantPrice {
//           amount
//           currencyCode
//         }
//         maxVariantPrice {
//           amount
//           currencyCode
//         }
//       }
//       images {
//         originalSrc
//         id
//         localFile {
//           childImageSharp {
//             fluid(maxWidth: 910) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `

import React, { useState, useContext } from 'react'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import styled from 'styled-components'
import ProductForm from '../components/ProductForm'
import SoldOut from '../components/ProductGrid/soldOut'
import Img from 'gatsby-image'
import ToggleContent from '../components/ToggleContent'
// import { listProductLikes, getProductLike } from '../graphql/queries'
// import { createProductLike, deleteProductLike } from '../graphql/mutations'
import { Auth, API, graphqlOperation } from 'aws-amplify'
// import { Connect } from 'aws-amplify-react'
// import uuid from 'uuid'

const GridLeft = styled.div`
  grid-area: left;
`

const GridRight = styled.div`
  grid-area: right;
`

const Container = styled.div`
  margin: 0 auto;
`
const ImageSection = styled.div`
  svg {
    position: absolute;
    top: 144px;
    z-index: 100;
  }
`
const ImageContain = styled.div`
  margin: 1em 0;
`

const SizeChart = styled.div`
  margin-top: 3em;
`

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr;
  grid-template-rows: 1auto;
  grid-template-areas: 'left . right';

  @media screen and (max-width: 800px) {
    display: block;
  }
`

const ProductTitle = styled.h1`
  margin-bottom: 15px;
  margin: 0 0 0.5rem;
  line-height: 1.4;
`

const ProductDescription = styled.div`
  margin-top: 40px;

  ul {
    margin-left: 3em;
  }
`

const SizeChartButton = styled.button`
  background: none;
  outline: none;
  border: 1px solid ${props => props.theme.primarycolor};
  padding: 7px;
  border-radius: 4px;
  width: 120px;
  cursor: pointer;
  color: ${props => props.theme.primarycolor};
  transition: all 0.3s ease 0s;

  &:hover {
    background: ${props => props.theme.primarycolor};
    color: white;
  }
`

const SizeChartOpen = styled.div`
  position: fixed;
  background: white;
  max-width: 700px;
  top: 30%;
  left: 200px;
  height: 40vh;

  button {
    float: right;
  }
`

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const user =  Auth.currentAuthenticatedUser()
  const avaiable = product.availableForSale
  // const [isToggled, setToggled] = useState(false)
  const [showText] = useState(false)

  // const { data } =  API.graphql(
  //   graphqlOperation(listProductLikes, {
  //     filter: { productId: { eq: product.id } },
  //   })
  // )
  // const like = data.listProductLikes.items[0]
  // const [noLoggedIn, isLoggedIn] = useState(false);
  // this.setState({ isLoggedIn: !!user, like })

  // const toggleLike = () => {
  //   const post = this.props.data.shopifyProduct

  //   if (this.state.like) {
  //       graphqlOperation(deleteProductLike, {
  //         input: { id: this.state.like.id },
  //       })
  //     this.setState({ like: null })
  //   } else {
  //     const like = {
  //       postId: post.id,
  //       id: uuid(),
  //     }

  //       graphqlOperation(createProductLike, {
  //         input: like,
  //       })
  //     this.setState({ like })
  //   }
  // }

  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Container>
        <TwoColumnGrid>
          <GridLeft>
            <p>
              <Link to="/"> Home </Link> / {product.title}{' '}
            </p>
            <ImageSection>
              {!avaiable && <SoldOut />}
              {product.images.map(image => (
                <ImageContain key={image.id}>
                  <Img
                    fluid={image.localFile.childImageSharp.fluid}
                    key={image.id}
                    alt={product.title}
                  />
                </ImageContain>
              ))}
            </ImageSection>
          </GridLeft>
          <GridRight>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductForm product={product} />
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {/* {isLoggedIn && (
              <div>
                <button onClick={toggleTrueFalse}>
                  <h3>Toggle me</h3>
                  {this.state.like ? 'Unlike' : 'Like'}
                </button>
              </div>
            )} */}

            {product.tags.length > 1 && (
              <SizeChart>
                <ToggleContent
                  toggle={show => (
                    <SizeChartButton onClick={show}>Size Chart</SizeChartButton>
                  )}
                  content={hide => (
                    <SizeChartOpen
                      className={` ${showText ? 'close' : 'open'}`}
                    >
                      <button
                        className={` ${showText ? 'close' : ''}`}
                        onClick={hide}
                      >
                        close
                      </button>

                      <h2>This is where the size chart goes</h2>
                    </SizeChartOpen>
                  )}
                />
              </SizeChart>
            )}
          </GridRight>
        </TwoColumnGrid>
      </Container>
    </>
  )
}
export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      tags
      description
      descriptionHtml
      shopifyId
      availableForSale
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage
