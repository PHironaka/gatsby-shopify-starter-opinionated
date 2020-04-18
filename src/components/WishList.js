import React from 'react'
import { Link, graphql } from 'gatsby'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import uuid from 'uuid'
import SEO from '../components/seo'
import { listProductLikes, getProductLike } from '../graphql/queries'
import { createProductLike, deleteProductLike } from '../graphql/mutations'

class WishList extends React.Component {
  state = {
    isLoggedIn: false,
    liked: null,
  }

  componentDidMount = async () => {
    const post = this.props.data.shopifyProduct
    const user = await Auth.currentAuthenticatedUser()
    const { data } = await API.graphql(
      graphqlOperation(listProductLikes, {
        filter: { productId: { eq: post.id } },
      })
    )
    const like = data.listProductLikes.items[0]

    this.setState({ isLoggedIn: !!user, like })
  }

  toggleLike = async () => {
    const post = this.props.data.shopifyProduct

    if (this.state.like) {
      await API.graphql(
        graphqlOperation(deleteProductLike, {
          input: { id: this.state.like.id },
        })
      )
      this.setState({ like: null })
    } else {
      const like = {
        postId: post.id,
        id: uuid(),
      }

      await API.graphql(
        graphqlOperation(createProductLike, {
          input: like,
        })
      )
      this.setState({ like })
    }
  }

  render() {
    const post = this.props.data.shopifyProduct
    const { previous, next } = this.props.pageContext
    const { isLoggedIn, likesPost } = this.state

    return (
      <>
        <SEO title={post.title} description={post.excerpt} />
        <h1>{post.title}</h1>
        {isLoggedIn && (
          <div>
            <button onClick={this.toggleLike}>
              {this.state.like ? 'Unlike' : 'Like'}
            </button>
          </div>
        )}
        
        <div dangerouslySetInnerHTML={{ __html: post.descriptionHtml }} />
       
      </>
    )
  }
}

export default WishList

export const pageQuery = graphql`
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
