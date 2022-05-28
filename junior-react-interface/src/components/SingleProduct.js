// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { gql } from '@apollo/client'
import loading from 'src/assets/images/loading.gif'
import styled from 'styled-components'

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
`
export class SingleProduct extends Component {
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
    } = this

    console.log(singleProduct?.name)

    return (
      <Wrapper>
        {isLoading ? (
          <div className="loading">
            <img src={loading} alt="loading..." />
          </div>
        ) : (
          <div>{singleProduct.name}</div>
        )}
      </Wrapper>
    )
  }
}

export default SingleProduct
