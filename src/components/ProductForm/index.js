import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from 'styled-components'

const QuantityContain = styled.div`
  display:grid;
  grid-template-columns:35px 25px 40px;
  margin:1em 0;
`

const AddRemoveItems = styled.div`
  border: none;
  outline: none;
  text-align:center;
  margin-top:5px;
`

const QuantityButton = styled.div`
  cursor: pointer;
  border:1px solid;
  padding:4px 10px; 
  display:block;
  position:relative;
  text-align:center;
  transition: all 0.3s ease 0s;
  background:white;

  &:hover {
    background:black;
    color:white;
  }

`

const AddToCart = styled.button`
  background:none;
  border:1px solid;
  outline:none;
  width:150px;
  text-align:center;
  cursor: pointer;
  padding:7px;
  border-radius:4px;
  transition: all 0.3s ease 0s;
  background:white;

  &:disabled {
  background:white;
  transition:none;
  cursor: text;
   
    }
  }
  &:hover:enabled {
    background:black;
    color:white;
  }

`

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(() => {
        // this checks the currently selected variant for availability
        const result = variants.filter(
          variant => variant.shopifyId === productVariant.shopifyId
        )
        setAvailable(result[0].availableForSale)
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
    console.log(target.value);

  }


  const decreaseItem = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }else {
      return null 
  }
}

  const increaseItem = () => {
    if(quantity < 8) {
      setQuantity(quantity + 1)
    }else {
      return null 
  }
}

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
    console.log("Product Added!")
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <>
      <h3>{price}</h3>
      {options.map(({ id, name, values }, index) => (
        <React.Fragment key={id}>
          <label htmlFor={name}>{name} </label>
          <select
            name={name}
            key={id}
            onChange={event => handleOptionChange(index, event)}
          >
            {values.map(value => (
              <option
                value={value}
                key={`${name}-${value}`}
                disabled={checkDisabled(name, value)}
              >
                {value}
              </option>
            ))}
          </select>
          <br />
        </React.Fragment>
      ))}
      <QuantityContain>
        <QuantityButton disabled={!available || adding} onClick={decreaseItem}>-</QuantityButton>

        <AddRemoveItems
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          disabled={!available || adding}
          onChange={handleQuantityChange}
        >
          {quantity}
        </AddRemoveItems>
        <QuantityButton disabled={!available || adding} onClick={increaseItem}>+</QuantityButton>
      </QuantityContain>

      <br />
      <AddToCart
        type="submit"
        disabled={!available || adding}
        onClick={handleAddToCart}
      >
        Add to Cart
      </AddToCart>
      {!available && <p>This Product is out of Stock!</p>}
    </>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
