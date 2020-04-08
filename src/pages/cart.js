import React from 'react'
import Cart from '../components/Cart'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
`
const CartPage = () => (
  <>

  <Container>
    <h1>Cart</h1>
    <Cart />
  </Container>
  </>
  
)

export default CartPage
