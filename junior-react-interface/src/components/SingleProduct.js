import React, { Component } from 'react'
import { gql } from '@apollo/client'
import loading from 'src/assets/images/loading.gif'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
  .main {
    gap: 60px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: ${(props) => props.theme.breakpoint.md}) {
      flex-wrap: wrap;
    }
  }

  .gallery {
    gap: 20px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: ${(props) => props.theme.breakpoint.lg}) {
      flex-direction: column-reverse;
    }
    .thumbnail {
      display: flex;
      flex-direction: column;
      gap: 20px;
      flex-wrap: wrap;
      @media (max-width: ${(props) => props.theme.breakpoint.lg}) {
        flex-direction: row;
      }
    }
    .thumbnail-image,
    .full-image {
      height: 90px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      width: 100px;
    }
    .thumbnail-image {
      box-shadow: rgb(0 0 0 / 10%) 0px 10px 24px;
    }

    .full-image {
      min-width: 381px;
      height: 100%;
      @media (max-width: ${(props) => props.theme.breakpoint.lg}) {
        height: 400px;
      }
      @media (max-width: ${(props) => props.theme.breakpoint.md}) {
        width: auto;
        min-width: 261px;
      }
    }
  }
  .title {
    margin-bottom: 28px;
    .text {
      font-size: 24px;
      line-height: 24px;
    }
    .bold {
      font-weight: 600;
      margin-bottom: 10px;
    }
  }

  .descriptions {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .attribute-name {
    font-weight: 600;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-family: RobotoCondensed, sans-serif;
  }
  .boxes {
    display: flex;
    gap: 6px;
    list-style-type: none;

    .box {
      border: 1px solid ${(props) => props.theme.colors.text_01};
      width: 57px;
      height: 36px;
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

  .price {
    .key {
      font-weight: 600;
      line-height: 18px;
      font-family: RobotoCondensed, sans-serif;
    }
    .amount {
      font-weight: 600;
      margin-top: 8px;
      font-size: 18px;
      line-height: 18px;
    }
  }

  .green-btn {
    height: 43px;
    padding: 13px;
    outline: none;
    cursor: pointer;
    width: 279px;
    margin-top: 21px;
    background-color: ${(props) => props.theme.colors.primary_color};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.primary_color};
    &:hover {
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.primary_color};
      transition: 0.3s;
    }
  }

  .describe {
    margin-top: 15px;
    font-family: Roboto, sans-serif;
    max-width: 300px;
    max-height: 200px;
    overflow-y: scroll;
    padding-bottom: 20px;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      max-width: max-content;
    }
  }
  //custom scrollbar
  .describe::-webkit-scrollbar {
    width: 3px;
  }

  .describe::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .describe::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary_color};
    outline: none;
  }
`
export class SingleProduct extends Component {
  static propTypes = {
    activeCurrencyLabel: PropTypes.string,
    cartFullPageStyles: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    this.state = {
      singleProduct: {},
      isLoading: true,
    }
  }

  componentDidMount = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const paramsObj = Object.fromEntries(searchParams)

    this.props.client
      .query({
        query: gql`
        {
          product(id: "${paramsObj.id}") {
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
        }`,
      })
      .then((response) => {
        this.setState({ singleProduct: response.data.product, isLoading: false })
      })
  }

  render() {
    const {
      state: { isLoading, singleProduct },
      props: { activeCurrencyLabel },
    } = this

    return (
      <Wrapper>
        {isLoading ? (
          <div className="loading">
            <img src={loading} alt="loading..." />
          </div>
        ) : (
          <div className="main">
            <div className="gallery">
              <div className="thumbnail">
                {singleProduct.gallery.map((image) => {
                  return (
                    <div
                      key={image}
                      className="
                    thumbnail-image"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  )
                })}
              </div>

              <div
                className="
                  full-image"
                style={{ backgroundImage: `url(${singleProduct.gallery[0]})` }}
              ></div>
            </div>
            <div className="details">
              <div className="title">
                <p className="text bold">{singleProduct.name}</p>
                <p className="text">{singleProduct.brand}</p>
              </div>
              <div className="descriptions">
                {singleProduct.attributes.map((attribute) => {
                  return attribute.id.includes('Color') ? (
                    <div key={attribute.id} className="attributes">
                      <p className="attribute-name">{attribute.id}:</p>
                      <ul className="boxes">
                        {attribute.items.map((item) => (
                          <li
                            key={item.value}
                            style={{ backgroundColor: item.value }}
                            className="box color"
                          ></li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div key={attribute.id} className="attributes">
                      <p className="attribute-name">{attribute.id}:</p>
                      <ul className="boxes">
                        {attribute.items.map((item) => (
                          <li
                            key={item.value}
                            className={` box ${item.value === 'S' ? 'active' : ''}`}
                          >
                            {item.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}

                <div className="price">
                  <p className="key">PRICE:</p>
                  <p className="amount">
                    {
                      singleProduct.prices.find((obj) => {
                        return obj.currency.label === activeCurrencyLabel
                      }).currency.label
                    }
                    {
                      singleProduct.prices.find((obj) => {
                        return obj.currency.label === activeCurrencyLabel
                      }).amount
                    }
                  </p>
                </div>
                <Link to="/cart">
                  <button className="green-btn">ADD TO CART</button>
                </Link>
                <p className="describe">{singleProduct.description.replace(/<[^>]+>/g, '')}</p>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    )
  }
}

export default SingleProduct
