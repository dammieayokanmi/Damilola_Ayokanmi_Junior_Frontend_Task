import React, { Component } from 'react'
import { gql } from '@apollo/client'
import { ProductCard } from 'src/components/ProductCard'
import PropTypes from 'prop-types'
import loading from 'src/assets/images/loading.gif'


export class AllProducts extends Component {
  static propTypes = {
    activeCurrencyLabel: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      allProducts: [],
      isLoading: true,
    }
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: gql`
          {
            category {
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
        this.setState({ allProducts: response.data.category.products, isLoading: false })
      })
  }

  render() {
    const {
      props: { activeCurrencyLabel },

      state: { isLoading, allProducts },
    } = this

    return (
      <>
        {isLoading ? (
          <div className="loading">
            <img src={loading} alt="loading..." />
          </div>
        ) : (
          <div className="products--grid">
            {allProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeCurrencyLabel={activeCurrencyLabel}
                />
              )
            })}
          </div>
        )}
      </>
    )
  }
}

export default AllProducts
