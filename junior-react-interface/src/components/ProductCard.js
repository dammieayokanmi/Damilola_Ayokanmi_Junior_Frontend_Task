import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cartWhite from 'src/assets/images/cart-white.svg'
import { Link } from 'react-router-dom'
const Wrapper = styled.div`
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover .product-card__content > .product-card__content-image #showCart {
    visibility: visible;
    opacity: 1;
    cursor: pointer;
  }

  .product-card__content-image {
    height: 330px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    max-width: 100%;
    position: relative;

    #showCart {
      width: 52px;
      height: 52px;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.5s linear;
      position: absolute;
      right: 10px;
      bottom: -23px;
      background-color: ${(props) => props.theme.colors.primary_color};
      padding: 15px;
      border-radius: 50px;
      transition: 0.3s;

      &:hover {
        transform: scale(1.1);
      }
    }

    .stock--overlay {
      text-align: center;
      background-color: ${(props) => props.theme.colors.bg_overlay_01};
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      p {
        font-size: 20px;
        line-height: 160%;
        color: ${(props) => props.theme.colors.text_02};
      }
    }
  }

  .product-card__content-text {
    margin-top: 10px;
    p {
      font-size: 16px;
      line-height: 160%;
      color: ${(props) => props.theme.colors.text_02};
      font-weight: 400;
    }
    .product-card__content-text--name {
      font-size: 19px;
    }
    .product-card__content-text--price {
      display: flex;
      p {
        font-weight: 500;
        color: ${(props) => props.theme.colors.text_01};
      }
    }
  }
`

export class ProductCard extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    activeCurrencyLabel: PropTypes.string,
  }

  render() {
    const {
      props: { product, activeCurrencyLabel },
    } = this
    const filterCurrentAmount = product.prices.find((obj) => {
      return obj.currency.label === activeCurrencyLabel
    })

    return (
      <Wrapper>
        <Link to={`/product/${product.id}`}>
          <div className="product-card__content">
            <div
              className="product-card__content-image"
              style={{ backgroundImage: `url(${product.gallery[0]})` }}
            >
              {' '}
              {product.inStock && (
                <div className="stock--overlay">
                  <p>OUT OF STOCK</p>
                </div>
              )}
              <div id="showCart">
                <img src={cartWhite} alt="add to cart" />
              </div>
            </div>
            <div className="product-card__content-text">
              <p className="product-card__content-text--name">{product.name}</p>
              <div className="product-card__content-text--price">
                {' '}
                <p>{filterCurrentAmount.currency.symbol}</p>
                {product.prices.some(
                  (currentLabel) => currentLabel.currency.label === activeCurrencyLabel
                ) && <p>{filterCurrentAmount.amount}</p>}
              </div>
            </div>
          </div>
        </Link>
      </Wrapper>
    )
  }
}

export default ProductCard
