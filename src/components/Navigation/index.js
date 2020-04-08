import React, { useState, useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import Cart from '../Cart'
import {  Link } from 'gatsby'
import StoreContext from '../../context/StoreContext'
import ToggleContent from '../ToggleContent'
import styled from 'styled-components'
import CloseCartButton from './closeCart'
import CartIcon from './cartIcon'
import SearchBar from './searchBar'

const Container = styled.div`
  display: grid;
  grid-template-columns:1fr 2fr;
  justify-content: center;
  align-items: center;
  padding: 1em 3em;
  margin: 0 auto;
  max-width: 1400px;
  @media screen and (max-width: 800px) {
    padding: 1em ;
  }
`

 const CartButton = styled.div`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  cursor:pointer;
  font-weight: bold;
`



 const CartCounter = styled.span`
  background-color: white;
  color: ${props => props.theme.primarycolor};
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin: -10px;
  z-index: 20;
`

const LogoLink = styled.div`
  color: white;
  text-decoration: none;
  font-size: 2em;
  font-weight: bold;

  @media screen and (max-width: 800px) {
    font-size: 1.4em;
  }
`


const HeaderWrapper = styled.div`
  background: ${props => props.theme.primarycolor};
  margin-bottom: 1.45rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const RightNavArea = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-gap:2em;
  justify-items: end;
`

const CartContainer = styled.div`
  position: fixed;
  right: -50%;
  top: 0;
  bottom: 0;
  width: 40%;
  min-width: 320px;
  background-color: white;
  z-index: 1000;
  padding: 1em;
  animation: slideOut 0.3s ease-out forwards;
  &.close {
    animation: slideOut 0.3s ease-out forwards;
  }

  &.open {
    animation: slideIn 0.3s ease-out forwards;
  }

  @keyframes slideIn {
    0% {
      right: calc(-100%);
    }
    100% {
      right: 0;
    }
  }

  @keyframes slideOut {
    0% {
      right: 0;
    }
    100% {
      right: calc(-100%);
    }
  }
`

const CloseCart = styled.button`
  background: none;
  outline: none;
  border: none;
  font-size: 1.4em;
  cursor: pointer;
`

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()
  const [showText] = useState(false)

  return (
    <HeaderWrapper>
      <Container className={` ${showText ? 'open' : ''}`}>
        <Link to="/"><LogoLink>{siteTitle}</LogoLink></Link>

        <ToggleContent
          toggle={show => (
            <RightNavArea>
              <SearchBar />
              <CartButton onClick={show}>
                {hasItems && <CartCounter>{quantity}</CartCounter>}
                Cart <CartIcon />
              </CartButton>
            </RightNavArea>
          )}
          content={hide => (
            <CartContainer className={` ${showText ? 'close' : 'open'}`}>
              <CloseCart
                className={` ${showText ? 'close' : ''}`}
                onClick={hide}
              >
                <CloseCartButton />
              </CloseCart>
              <Cart />
            </CartContainer>
          )}
        />
      </Container>
    </HeaderWrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
