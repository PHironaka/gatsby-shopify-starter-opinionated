import React, {  useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'
import EmptyCart from './emptyCart'
import styled from 'styled-components'


const CheckOutButton = styled.button`
  position:sticky;
  bottom:10px;
  width:100%;
  text-align:center;
  overflow:hidden;
  right:0;
  cursor:pointer;
  transition: all 0.3s ease 0s;
  background:none;
  outline:none;
  z-index:1000;
  padding:10px;
  border:1px solid;


  &:hover {
    background:black;
    color:white;
  }

`

const Cart = () => {
  const {
    store: { checkout },
    
  } = useContext(StoreContext)
  
  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  return (
    <div className="cart-drawer"  >
    {checkout.lineItems.length > 0 ? (
      <div>

      {line_items}
      <h2>Subtotal</h2>
      <p>$ {checkout.subtotalPrice}</p>
      <br />
      <h2>Taxes</h2>
      <p>$ {checkout.totalTax}</p>
      <br />
      <h2>Total</h2>
      <p>$ {checkout.totalPrice}</p>
      <br />
      <CheckOutButton onClick={handleCheckout} disabled={checkout.lineItems.length === 0}>Check out</CheckOutButton>
      </div>
     
      ) : (
         <EmptyCart />
      )}
      </div>
  )
}

export default Cart
