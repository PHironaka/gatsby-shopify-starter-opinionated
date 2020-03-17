import React, { useState, useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import { Wrapper } from './styles'
import styled from 'styled-components'

const QuantityContain = styled.div`
  display: grid;
  grid-template-columns: 35px 25px 40px;
  margin: 1em 0;
`

const AddRemoveItems = styled.div`
  border: none;
  outline: none;
  text-align: center;
  margin-top: 5px;
`

const QuantityButton = styled.div`
  cursor: pointer;
  border: 1px solid;
  padding: 4px 10px;
  display: block;
  position: relative;
  text-align: center;
  transition: all 0.3s ease 0s;
  background: white;
  

  &:hover {
    background: ${props => props.theme.primarycolor};
    color: white;
  }
`

const RemoveItem = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.primarycolor};
  padding: 6px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background: white;
  color: ${props => props.theme.primarycolor};
  max-height: 86px;
  max-width: 140px;
  align-self: center;

  &:hover {
    background: ${props => props.theme.primarycolor};
    color: white;
  }
`


const LineItem = props => {
  const { line_item } = props
  const [quantity, setQuantity] = useState(line_item.quantity)
  const {
    removeLineItem, 
    updateLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)


  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
      height="60px"
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }


  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
      updateLineItem(client, checkout.id, line_item.id, target.value)
    }
  


  const decreaseItem = () => {
    
    if(quantity > 1) {
      updateLineItem(client, checkout.id, line_item.id, line_item.quantity - 1)
    }else {
      return null 
  }
}

  const increaseItem = () => {
    if(quantity < 8) {
      updateLineItem(client, checkout.id, line_item.id, line_item.quantity + 1)
    }else {
      return null 
  }
}

  return (
    <Wrapper>
      {variantImage}
      <p>
        {line_item.title}
        {`  `}
        {line_item.variant.title === !'Default Title'
          ? line_item.variant.title
          : ''}
      </p>
      
      
      {selectedOptions}
      <QuantityContain>
    
        <QuantityButton onClick={decreaseItem}>-</QuantityButton>
        <AddRemoveItems
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          value={line_item.quantity}
          onChange={handleQuantityChange}
        >
          {line_item.quantity}
        </AddRemoveItems>
        <QuantityButton onClick={increaseItem}>+</QuantityButton>
      </QuantityContain>
      <RemoveItem 
        onClick={handleRemove}>
        Remove
      </RemoveItem>
    </Wrapper>
  )
}

export default LineItem
