import React, { Component } from 'react'
import styled from 'styled-components'
import cart from 'src/assets/images/cart.svg'

const Wrapper = styled.div`
  .navbar__cart {
    position: relative;

    img {
      width: 27px;
      height: 20px;
    }

    .navbar__cart--items {
      background-color: ${(props) => props.theme.colors.dark};
      color: ${(props) => props.theme.colors.white};
      border-radius: 50%;
      width: 18px;
      justify-content: center;
      font-weight: 500;
      align-items: flex-start;
      height: 18px;
      display: flex;
      font-size: 12px;
      position: absolute;
      right: -8px;
      top: -7px;
    }
  }
`
export class Cart extends Component {

  render() {
    return (
      <Wrapper>
        <div className="navbar__cart">
          <img src={cart} alt="Brand cart" />
          <p className="navbar__cart--items">3</p>
        </div>
      </Wrapper>
    )
  }
}

export default Cart
