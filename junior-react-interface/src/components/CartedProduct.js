import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  .carted-product__content {
    display: grid;
    grid-template-columns: 60% 37%;
    gap: 8px;
    margin-bottom: 40px;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: flex;
      flex-direction: column-reverse;
    }

    .rhs {
      display: flex;
      gap: 8px;
    }
  }
  .carted-product__content-page {
    padding: 15px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.border_01};
    margin-bottom: 0px;
  }
  .carted-product__content-image {
    height: 190px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    max-width: 100%;
    position: relative;
    flex-grow: 1;
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;

    .text {
      color: ${(props) => props.theme.colors.text_01};
      font-size: 16px;
      line-height: 160%;
    }
    .price {
      span {
        font-weight: 500;
      }
    }
  }
  .boxes {
    display: flex;
    gap: 6px;
    .box {
      border: 1px solid ${(props) => props.theme.colors.text_01};
      min-width: 35px;
      text-align: center;
      font-size: 14px;
      padding: 7px;
      &.active {
        background-color: ${(props) => props.theme.colors.dark};
        transition: 0.3s;
        color: ${(props) => props.theme.colors.white};
      }
    }
    .color {
      width: 23px;
      height: 23px;
      min-width: auto;
    }
  }
  .quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    button {
      border: 1px solid ${(props) => props.theme.colors.text_01};
      background-color: ${(props) => props.theme.colors.white};
      width: 23px;
      font-size: 31px;
      line-height: 11px;
      height: 23px;
      line-height: 11px;
      &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.dark};
        transition: 0.3s;
        color: ${(props) => props.theme.colors.white};
      }
    }
  }
`

export class CartedProduct extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    activeCurrencyLabel: PropTypes.string,
    cartFullPageStyles: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    this.state = {
      productCount: 1,
    }
  }

  increaseProductCount = () => {
    this.setState({ productCount: this.state.productCount + 1 })
  }
  decreaseProductCount = () => {
    if (this.state.productCount > 1) {
      this.setState({ productCount: this.state.productCount - 1 })
    } else {
      this.setState({ productCount: this.state.productCount })
    }
  }

  render() {
    const {
      increaseProductCount,
      decreaseProductCount,
      props: { product, activeCurrencyLabel, cartFullPageStyles = false },
      state: { productCount },
    } = this
    const filterCurrentAmount = product?.prices.find((obj) => {
      return obj.currency.label === activeCurrencyLabel
    })

    const allColors = product.attributes.find((attribute) => attribute.name === 'Color')

    const allCapacities = product.attributes.find((attribute) => attribute.id === 'Capacity')
    // console.log(product.attributes)

    return (
      <Wrapper>
        <div
          className={`${
            cartFullPageStyles ? 'carted-product__content-page ' : ''
          }carted-product__content`}
        >
          <div className="details">
            <p className="text">{product.name}</p>
            <div className="price">
              {' '}
              <span className="text">{filterCurrentAmount.currency.symbol}</span>
              {product.prices.some(
                (currentLabel) => currentLabel.currency.label === activeCurrencyLabel
              ) && <span className="text">{filterCurrentAmount.amount}</span>}
            </div>
            <div className="capacities">
              <p className="text">{allCapacities.id}:</p>
              <div className="boxes">
                {allCapacities?.items.map((capacity) => {
                  return (
                    <p key={capacity.value } className={` text box ${capacity.value === '1T' ? 'active' : ''}`}>
                      {capacity.value}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className="colors">
              <p className="text">{allColors?.id}:</p>
              <div className="boxes">
                {allColors?.items.map((color) => {
                  return <p key={color.value} style={{ backgroundColor: color.value }} className="box color"></p>
                })}
              </div>
            </div>
          </div>
          <div className="rhs">
            <div className="quantity">
              <button onClick={increaseProductCount}>+</button>
              <p className="count">{productCount}</p>
              <button onClick={decreaseProductCount}>-</button>
            </div>
            <div
              className="carted-product__content-image"
              style={{ backgroundImage: `url(${product && product.gallery[0]})` }}
            ></div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default CartedProduct
