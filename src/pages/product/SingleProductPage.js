// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavBar } from 'src/components/NavBar'
import { SingleProduct } from 'src/components/SingleProduct'
import styled from 'styled-components'

const Wrapper = styled.div`
  .content {
    padding: 5px 50px;
    margin: 125px 0 50px 0;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      padding: 5px 25px;
    }
  }
`
export class SingleProductPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCurrencyLabel: 'AUD',
    }
  }
  onCurrencyMenuClick = (e) => {
    this.setState({ activeCurrencyLabel: e.currentTarget.textContent.split(' ')[1] })
  }

  render() {
    const {
      onCurrencyMenuClick,
      props: { client },
      state: { activeCurrencyLabel },
    } = this

    return (
      <Wrapper>
        <NavBar
          client={client}
          activeCurrencyLabel={activeCurrencyLabel}
          onCurrencyMenuClick={onCurrencyMenuClick}
        />
        <div className="content">
          <SingleProduct client={client}    activeCurrencyLabel={activeCurrencyLabel}/>
        </div>
      </Wrapper>
    )
  }
}

export default SingleProductPage
