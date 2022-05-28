import React, { Component } from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { CartedProduct } from 'src/components/CartedProduct'
import PropTypes from 'prop-types'
import { NavBar } from 'src/components/NavBar'
import loading from 'src/assets/images/loading.gif'

const Wrapper = styled.div`
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 130px);
    img {
      width: 100px;
    }
  }
  .content {
    padding: 5px 50px;
    margin: 125px 0 50px 0;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      padding: 5px 25px;
    }
    .heading {
      padding-bottom: 45px;
      border-bottom: 1px solid ${(props) => props.theme.colors.border_01};
      .bold {
        font-weight: bold;
      }
    }
  }
  .total {
    margin-top: 32px;
    .flex {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .text {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 168px;
      gap: 10px;
      font-size: 18px;
      .bold {
        font-weight: bold;
      }
    }

    .green-btn {
      height: 43px;
      padding: 13px;
      outline: none;
      cursor: pointer;
      width: 279px;
      margin-top: 29px;
      background-color: ${(props) => props.theme.colors.primary_color};
      color: ${(props) => props.theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors.primary_color};
      &:hover {
        background-color: ${(props) => props.theme.colors.white};
        color: ${(props) => props.theme.colors.primary_color};
        transition: 0.3s;
      }
      @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
        width: 100%;
      }
    }
  }
`
export class CartPage extends Component {
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
      activeCurrencyLabel: 'AUD',
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

  onCurrencyMenuClick = (e) => {
    this.setState({ activeCurrencyLabel: e.currentTarget.textContent.split(' ')[1] })
  }

  render() {
    const {
      onCurrencyMenuClick,
      props: { client },

      state: { isLoading, activeCurrencyLabel, techProducts },
    } = this
    const cartedProducts = techProducts.slice(0, 3)

    return (
      <Wrapper>
        <>
          <NavBar
            client={client}
            activeCurrencyLabel={activeCurrencyLabel}
            onCurrencyMenuClick={onCurrencyMenuClick}
          />
          <div className="content">
            <p className="heading">
              <span className="bold">CART</span>
            </p>
            {isLoading ? (
              <div className="loading">
                <img src={loading} alt="loading..." />
              </div>
            ) : (
              <div>
                <div>
                  {cartedProducts.map((product) => {
                    return (
                      <CartedProduct
                        key={product.id}
                        product={product}
                        activeCurrencyLabel={activeCurrencyLabel}
                        cartFullPageStyles={true}
                      />
                    )
                  })}
                </div>
                <div className="total">
                  <div className="flex">
                    <div className="text">
                      <p>Tax 21%:</p>
                      <p className="bold">$42.00</p>
                    </div>

                    <div className="text">
                      <p>Quantity:</p>
                      <p className="bold">{cartedProducts.length}</p>
                    </div>
                    <div className="text">
                      <p>Total</p>
                      <p className="bold">$700.00</p>
                    </div>
                  </div>

                  <button className="green-btn">ORDER</button>
                </div>
              </div>
            )}
          </div>
        </>
      </Wrapper>
    )
  }
}

export default CartPage
