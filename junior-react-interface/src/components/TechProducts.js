import React, { Component } from 'react'
import { gql } from '@apollo/client'
import { ProductCard } from 'src/components/ProductCard'
import PropTypes from 'prop-types'
import loading from 'src/assets/images/loading.gif'


export class TechProducts extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        activeCurrencyLabel: PropTypes.string,
      }

  constructor(props) {
    super(props)
    this.state = {
      techProducts: [],
      isLoading: true,
    }
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: gql`
          {
            category(input: { title: $title }) {
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
        variables: { title: 'tech' },

      })
      .then((response) => {
        this.setState({ techProducts: response.data.category.products, isLoading: false })
      })
  }

  render() {
    const {
        props: { activeCurrencyLabel },

      state: { isLoading, techProducts },
    } = this

    return (
      <>
        {isLoading ? (
          <div className="loading">
          <img src={loading} alt="loading..." />
        </div>
        ) : (
          <div className="products--grid">
            {techProducts.map((product) => {
              return <ProductCard key={product.id} product={product} activeCurrencyLabel={activeCurrencyLabel} />
            })}
          </div>
        )}
      </>
    )
  }
}

export default TechProducts
