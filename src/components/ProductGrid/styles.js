import styled from '@emotion/styled'

import { breakpoints } from '../../utils/styles'


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;

  @media (max-width: ${breakpoints.s}px){
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Product = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
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