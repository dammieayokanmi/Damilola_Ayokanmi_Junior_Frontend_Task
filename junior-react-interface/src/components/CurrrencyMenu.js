import React, { Component } from 'react'
import arrow from 'src/assets/images/arrow.svg'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  position: relative;

  .navbar__currency-menu {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    gap: 8px;
    align-items: baseline;
    width: 38px;

    .navbar_currency-toggler {
      width: 10px;
      height: 5px;
      &.isOpen {
        transform: rotate(-180deg);
      }
    }

    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      gap: 2px;
    }
  }
  .menu {
    position: absolute;
    padding: 10px 0;
    min-width: 124px;
    height: auto;
    background-color: ${(props) => props.theme.colors.white};
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 24px;
    &.isShowing {
      opacity: 1;
      visibility: visible;
            left: -40px;
      top: 30px;
    }

    .menu__list {
      list-style-type: none;

      li {
        padding: 12px 21px;
        font-size: 14px;
        &:hover {
          background-color: ${(props) => props.theme.colors.grey_02};
        }
      }
    }

    .menu__list--active {
      background-color: ${(props) => props.theme.colors.grey_01};
    }
  }
`

export class CurrrencyMenu extends Component {
  static propTypes = {
    activeCurrencyLabel: PropTypes.string,
    onCurrencyMenuClick: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      currencies: [],
      // activeCurrencyLabel: 'AUD',
      activeCurrencySymbol: 'A$',
    }
  }

  componentDidMount = () => {
    this.props.client
      .query({
        query: gql`
          {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((response) => {
        this.setState({ currencies: response.data.currencies })
      })
  }

  toggleCurrencyMenu = () => {
    const currentState = this.state.isMenuOpen
    this.setState({ isMenuOpen: !currentState })
  }
  handleCurrencyClick = (e) => {
    this.props.onCurrencyMenuClick(e)
    this.setState({ activeCurrencySymbol: e.currentTarget.textContent.split(' ')[0] })
  }

  render() {
    const {
      toggleCurrencyMenu,
      handleCurrencyClick,
      props: { activeCurrencyLabel },
      state: { isMenuOpen, currencies, activeCurrencySymbol },
    } = this

    return (
      <Wrapper>
        <div className="navbar__currency-menu" onClick={toggleCurrencyMenu}>
          <p className="currency">{activeCurrencySymbol}</p>
          <img
            className={`navbar_currency-toggler ${isMenuOpen ? 'isOpen' : ''}`}
            src={arrow}
            alt="arrow"
          />
        </div>
        <div className={`menu ${isMenuOpen ? 'isShowing' : null}`}>
          <ul className="menu__list">
            {currencies.map((currency) => {
              return (
                <li
                  onClick={handleCurrencyClick}
                  className={`${currency.label === activeCurrencyLabel && 'menu__list--active'}`}
                  key={currency.symbol}
                >
                  {currency.symbol} <span>{currency.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Wrapper>
    )
  }
}

export default CurrrencyMenu
