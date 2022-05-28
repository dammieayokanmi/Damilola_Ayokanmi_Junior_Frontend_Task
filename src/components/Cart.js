import React, { Component } from 'react'
import styled from 'styled-components'
import cart from 'src/assets/images/cart.svg'
import { gql } from '@apollo/client'
import { CartedProduct } from 'src/components/CartedProduct'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
  .menu {
    position: absolute;
    padding: 32px 16px;
    min-width: 325px;
    height: auto;
    background-color: ${(props) => props.theme.colors.white};
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 24px;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: 100%;
      max-width: 284px;
      min-width: auto;
    }
    &.isShowing {
      opacity: 1;
      visibility: visible;
      right: 22px;
      top: 80px;
      @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
        right: 18px;
      }
    }
    .menu-content {
      max-height: 400px;
      overflow-y: scroll;

      .heading {
        margin-bottom: 32px;
        .bold {
          font-weight: bold;
        }
      }
    }

    //custom scrollbar
    .menu-content::-webkit-scrollbar {
      width: 3px;
    }

    .menu-content::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .menu-content::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.primary_color};
      outline: none;
    }

    .total {
      margin: 32px 0;
      display: flex;
      justify-content: space-between;
      p {
        font-weight: 600;
      }
    }
    .menu-btns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      button {
        height: 43px;
        padding: 13px;
        outline: none;
        cursor: pointer;
        width: 100%;
      }
      .white-btn {
        background-color: ${(props) => props.theme.colors.white};
        color: ${(props) => props.theme.colors.text_01};
        border: 1px solid ${(props) => props.theme.colors.text_01};
        &:hover {
          background-color: ${(props) => props.theme.colors.text_01};
          color: ${(props) => props.theme.colors.white};
          transition: 0.3s;
        }
      }
      .green-btn {
        background-color: ${(props) => props.theme.colors.primary_color};
        color: ${(props) => props.theme.colors.white};
        border: 1px solid ${(props) => props.theme.colors.primary_color};
        &:hover {
          background-color: ${(props) => props.theme.colors.white};
          color: ${(props) => props.theme.colors.primary_color};
          transition: 0.3s;
        }
      }
    }
  }
  .overlay {
    background-color: ${(props) => props.theme.colors.bg_overlay_02};
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    width: 100%;

    height: 100vh;
    top: 80px;
    left: 0;
    position: absolute;
    &.isShowing {
      opacity: 1;
      visibility: visible;
    }
  }
`
export class Cart extends Component {
  static propTypes = {
    activeCurrencyLabel: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      techProducts: [],
      isLoading: true,
      isMenuOpen: false,
      category: 'tech',
    }
  }

  toggleCartMenu = () => {
    const currentState = this.state.isMenuOpen
    this.setState({ isMenuOpen: !currentState })
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: gql`
          {
            category(input: { title: "${this.state.category}"}) {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }
        `,
      })
      .then((response) => {
        this.setState({ techProducts: response.data.category.products, isLoading: false })
      })
  }

  render() {
    const {
      toggleCartMenu,
      props: { activeCurrencyLabel },

      state: { isLoading, isMenuOpen, techProducts },
    } = this
    const cartedProducts = techProducts.slice(0, 3)



    return (
      <Wrapper>
        <div className={`overlay ${isMenuOpen ? 'isShowing' : null}`}></div>
        <div className="navbar__cart" onClick={toggleCartMenu}>
          <img src={cart} alt="Brand cart" />
          <p className="navbar__cart--items">{cartedProducts.length}</p>
        </div>

        <div className={`menu ${isMenuOpen ? 'isShowing' : null}`}>
          <div className="menu-content">
            <p className="heading">
              <span className="bold">My Bag, </span>
              <span className="light"> {cartedProducts.length} items</span>
            </p>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {cartedProducts.map((product) => {
                  return (
                    <CartedProduct
                      key={product.id}
                      product={product}
                      activeCurrencyLabel={activeCurrencyLabel}
                    />
                  )
                })}
              </div>
            )}
          </div>
          <div className="total">
            <p>Total</p>
            <p>$700.00</p>
          </div>
          <div className="menu-btns">
            <Link to="/cart">
              <button className="white-btn">VIEW BAG</button>
            </Link>
            <button className="green-btn">CHECKOUT</button>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Cart
