import React, { useState, useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import Cart from '../Cart'
import StoreContext from '~/context/StoreContext'
import ToggleContent from '../ToggleContent'
import { CartCounter, Container, CartButton, MenuLink, Wrapper } from './styles'
import styled from 'styled-components'
import CloseCartButton from './closeCart'
import CartIcon from './cartIcon'

const CartContainer = styled.div`
    position: fixed;
    right: -50%;
    top: 0;
    bottom: 0;
    width: 40%;
    min-width: 320px;
    background-color: white;
    z-index:1000;
    padding:1em;
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

const CloseCart =styled.button`

background:none;
outline:none;
border:none;
font-size:1.4em;
cursor:pointer;

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
    <Wrapper>
      <Container className={` ${showText ? 'open' : ''}`}>
        <MenuLink to="/">{siteTitle}</MenuLink>

        <ToggleContent
          toggle={show => (
            <CartButton onClick={show}>
              {hasItems && <CartCounter>{quantity}</CartCounter>}
              Cart <CartIcon />
            </CartButton>
          )}
          content={hide => (
            <CartContainer className={` ${showText ? 'close' : 'open'}`}>
              <CloseCart className={` ${showText ? 'close' : ''}`} onClick={hide}><CloseCartButton /></CloseCart>
              <Cart />
            </CartContainer>
          )}
        />
      </Container>
    </Wrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
