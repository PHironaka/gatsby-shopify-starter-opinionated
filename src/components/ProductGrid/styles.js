import styled from '@emotion/styled'

import { breakpoints } from '../../utils/styles'


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;

  @media (max-width: ${breakpoints.s}px){
    grid-template-columns: repeat(1, 1fr);
  }
`

export const SoldOut = styled.div`
  position:absolute;
  top:0;
  right:10px;
  `

export const ProductImageAvail = styled.div`
      position: relative;
`

export const Product = styled.div`
  display: grid;
`

export const Title = styled.span`
  font-size: 1.2rem;
  font-weight:bold;
`

export const PriceTag = styled.span`
  font-size: 1rem;

  /* :before {
    content: '- '
  } */
`