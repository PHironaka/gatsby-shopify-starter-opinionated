import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from 'styled-components'

const QuantityContain = styled.div`
  display: grid;
  grid-template-columns: 35px 25px 40px;
  margin: 1em 0;
`

const ProductTitle = styled.h3`
  &:disabled {
    color: lightgray;
  }
`

const AddRemoveItems = styled.div`
  border: none;
  outline: none;
  text-align: center;
  margin-top: 5px;
`

const QuantityButton = styled.button`
  cursor: pointer;
  padding: 4px 10px;
  display: block;
  position: relative;
  text-align: center;
  transition: all 0.3s ease 0s;
  background: white;
  border: 1px solid ${props => props.theme.primarycolor};
  color: ${props => props.theme.primarycolor};

  &:disabled {
    background: white;
    transition: none;
    color: lightgray;
    border: 1px solid lightgray;
    cursor: text;
  }

  &:hover:enabled {
    background: ${props => props.theme.primarycolor};
    color: white;
  }
`

const AddToCart = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.primarycolor};
  outline: none;
  width: 150px;
  text-align: center;
  cursor: pointer;
  padding: 7px;
  border-radius: 4px;
  transition: all 0.3s ease 0s;
  background: white;
  color: ${props => props.theme.primarycolor};

  &:disabled {
    background: white;
    transition: none;
    color: lightgray;
    border: 1px solid lightgray;
    cursor: text;
  }

  &:hover:enabled {
    background: ${props => props.theme.primarycolor};
    color: white;
  }
`

const VariantContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  gap: 1em;
  text-align: center;
`

const IndividualVariant = styled.div`
  border: ${({ active }) => active ? '1pt solid transparent' : '1pt solid #4c30e8'};
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background: white;
  background-color: ${({ active }) => (active ? '#4c30e8' : 'transparent')};
  color: ${({ disabled }) => (disabled ? 'grey' : 'black')};
  color: ${({ active }) => (active ? 'white' : '#4c30e8')};

  &:disabled {
    background: white;
    transition: none;
    color: lightgray;
    border: 1px solid lightgray;
    cursor: text;
  }

  &:hover {
    background: ${props => props.theme.primarycolor};
    color: white;
  }

  &:active {
    background: ${props => props.theme.primarycolor};
    color: white;
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
    console.log(target.value)
  }

  const decreaseItem = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    } else {
      return null
    }
  }

  const increaseItem = () => {
    if (quantity < 8) {
      setQuantity(quantity + 1)
    } else {
      return null
    }
  }

  const handleClick = (optionIndex, value) => {
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
    console.log('Product Added!')
  }

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

  const hasVariants = variants.length > 1

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <>
      {!available && <p>This Product is out of Stock!</p>}
      <ProductTitle disabled={!available || adding}>{price}</ProductTitle>
      {hasVariants && (
        <div>
          {options.map(({ id, name, values }, optionIndex) => (
            <div key={id}>
              <h3>{name}</h3>
              <VariantContainer>
                {values.map(value => (
                  <IndividualVariant
                    key={`${id}-${value}`}
                    active={
                      variant.selectedOptions[optionIndex].value === value
                    }
                    onClick={() => handleClick(optionIndex, value)}
                    disabled={checkDisabled(name, value)}
                  >
                    {value}
                  </IndividualVariant>
                ))}
              </VariantContainer>
            </div>
          ))}
        </div>
      )}

      <QuantityContain>
        <QuantityButton disabled={!available || adding} onClick={decreaseItem}>
          -
        </QuantityButton>

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
        <QuantityButton disabled={!available || adding} onClick={increaseItem}>
          +
        </QuantityButton>
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
