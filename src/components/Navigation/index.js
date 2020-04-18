import React, { useState, useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import Cart from '../Cart'
import { Link } from 'gatsby'
import StoreContext from '../../context/StoreContext'
import ToggleContent from '../ToggleContent'
import styled from 'styled-components'
import CloseCartButton from './closeCart'
import CartIcon from './cartIcon'
import SearchBar from './searchBar'

const Container = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  align-items: center;
  padding: 1em 3em;
  grid-gap:1em;
  margin: 0 auto;
  max-width: 1400px;
  @media screen and (max-width: 800px) {
    padding: 1em;
    grid-template-columns: auto 1fr auto;
  }
`

const CartButton = styled.div`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
`

const CartCounter = styled.span`
  background-color: white;
  color: ${props => props.theme.primarycolor};
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1rem;
  float: right;
  margin: -10px;
  z-index: 20;
`

const LogoLink = styled.div`
  color: white;
  text-decoration: none;
  font-size: 2em;
  font-weight: bold;

  @media screen and (max-width: 900px) {
    font-size: 1.9em;
  }

  @media screen and (max-width: 700px) {
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
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-gap: 1em;
  justify-content: right;

  @media screen and (max-width: 800px) {
    grid-gap: 0;
  }
`

const NavContainer = styled.nav`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  height: 100vh;
  min-width: 320px;
  background-color: white;
  z-index: 999;
  padding: 1em;
  transition: transform 300ms;
  transform: ${({ nav }) => (nav ? 'translateX(0%)' : 'translateX(-100%)')};

  div {
    margin-top: 4em;
  }
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
  overflow-y: scroll;
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

const NavigationBar = styled.button`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  cursor: pointer;
  background: none;
  outline: none;
  justify-self: left;
  border: none;

  div {
    width: 1.8rem;
    height: 2px;
    margin: 7px 0;
    background: ${({ nav }) => (nav ? '#4c30e8' : 'white')};
    transform-origin: 1px;
    position: relative;
    z-index: 1000;
    transition: transform 300ms;

    :first-child {
      transform: ${({ nav }) => (nav ? 'rotate(41deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ nav }) => (nav ? '0' : '1')};
    }

    :nth-child(3) {
      transform: ${({ nav }) => (nav ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

const NavName = styled.div`
  a {
    font-weight: bold;
    font-size: 1.3em;
  }
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
  const [nav, showNav] = useState(false)

  function close() {
    showNav(false)
  }

  return (
    <HeaderWrapper>
      <Container>
        <NavigationBar nav={nav} onClick={() => showNav(!nav)}>
          <div />
          <div />
          <div />
        </NavigationBar>

        <NavContainer nav={nav}>
          <NavName onClick={close} key="accessories">
            <Link to="/collections/accessories">Accessories</Link>
          </NavName>

          <NavName onClick={close} key="tops">
            <Link to="/collections/tops">Tops</Link>
          </NavName>

          <NavName onClick={close} key="about">
            <Link to="/about">About Us</Link>
          </NavName>

          <NavName onClick={close} key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </NavName>

        </NavContainer>

        <Link to="/">
          <LogoLink>{siteTitle}</LogoLink>
        </Link>

        <ToggleContent
          toggle={show => (
            <RightNavArea>
              <SearchBar />
              <CartButton onClick={show}>
                {hasItems && <CartCounter>{quantity}</CartCounter>}
                <CartIcon />
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
