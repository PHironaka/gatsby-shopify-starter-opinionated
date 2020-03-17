import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'


export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1em 3em;
  margin: 0 auto;
  max-width: 1400px;
  @media (max-width: ${breakpoints.s}px){
    padding: 1em ;
  }
`

export const CartButton = styled.div`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  cursor:pointer;
  font-weight: bold;
`

export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: ${breakpoints.s}px){
    font-size: 1.4rem
  }
`

export const CartCounter = styled.span`
  background-color: white;
  color: ${props => props.theme.primarycolor};
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin: -10px;
  z-index: 20;
`

    
     
        
          
            
              