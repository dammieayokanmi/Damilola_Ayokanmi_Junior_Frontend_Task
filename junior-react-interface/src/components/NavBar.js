import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'
import styled from 'styled-components'
import logo from 'src/assets/images/logo.svg'
import { CurrrencyMenu } from 'src/components/CurrrencyMenu'
import { Cart } from 'src/components/Cart'
import arrow from 'src/assets/images/arrow.svg'

const Wrapper = styled.div`
  header {
    padding: 5px 50px;
    min-height: 80px;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.white};
    width: 100%;
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      padding: 5px 25px;
    }
  }
  .scroll {
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 2px;
  }
  .navbar {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .navbar__tab-list {
    cursor: pointer;
    list-style-type: none;
    li {
      padding: 18px 15px;
    }
  }
  .navbar__tab-list.mobile {
    display: none;
  }
  .navbar__tab-list.desktop {
    display: flex;
  }
  .navbar__logo {
    width: 32px;
    height: 28px;
    cursor: pointer;
  }
  .navbar__category-cart {
    display: flex;
    cursor: pointer;
    gap: 15px;
    align-items: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
    .navbar__tab-list.desktop {
      display: none;
    }
    .navbar__tab-list.mobile {
      display: block;
    }

    .navbar__category-menu {
      display: flex;
      cursor: pointer;
      gap: 8px;
      align-items: baseline;

      .navbar_category-toggler {
        width: 10px;
        height: 5px;
        &.isOpen {
          transform: rotate(-180deg);
        }
      }
    }
    .navbar__tab-list {
      li {
        padding: 10px;
      }
    }
    .tab-menu {
      position: absolute;
      padding: 10px 0;
      min-width: 100px;
      height: auto;
      background-color: ${(props) => props.theme.colors.white};
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.5s linear;
      box-shadow: rgb(0 0 0 / 10%) 0px 10px 24px;
      &.isShowing {
        opacity: 1;
        visibility: visible;
        top: 61px;
      }
    }
  }
  .navbar__category-cart {
    gap: 8px;
  }
`
export class NavBar extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    activeCurrencyLabel: PropTypes.string,
    onCurrencyMenuClick: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTab: this.props.children[0].props.label,
      isMenuOpen: false,
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab })
  }

  onClickLogo = () => {
    this.setState({ activeTab: 'all' })
  }

  toggleCategoryMenu = () => {
    const currentState = this.state.isMenuOpen
    this.setState({ isMenuOpen: !currentState })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.changeNavbarStyle)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeNavbarStyle)
  }

  changeNavbarStyle = () => {
    if (window.scrollY > 20) {
      document.querySelector('.header').className = 'header scroll'
    } else {
      document.querySelector('.header').className = 'header'
    }
  }

  render() {
    const {
      toggleCategoryMenu,
      onClickTabItem,
      onClickLogo,
      props: { children, client, activeCurrencyLabel, onCurrencyMenuClick },
      state: { activeTab, isMenuOpen },
    } = this

    return (
      <Wrapper>
        <div className="container">
          <header className="header">
            <div className="navbar">
              <div className="navbar__tab-list desktop">
                {children.map((child) => {
                  const { label } = child.props
                  return (
                    <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />
                  )
                })}
              </div>

              <div className="navbar__tab-list mobile">
                <div className="navbar__category-menu" onClick={toggleCategoryMenu}>
                  <p className="category">Category</p>
                  <img
                    className={`navbar_category-toggler ${isMenuOpen ? 'isOpen' : ''}`}
                    src={arrow}
                    alt="arrow"
                  />
                </div>
                <div className={`tab-menu ${isMenuOpen ? 'isShowing' : null}`}>
                  {children.map((child) => {
                    const { label } = child.props
                    return (
                      <Tab
                        activeTab={activeTab}
                        key={label}
                        label={label}
                        onClick={onClickTabItem}
                      />
                    )
                  })}
                </div>
              </div>

              <img onClick={onClickLogo} className="navbar__logo" src={logo} alt="Brand logo" />

              <div className="navbar__category-cart">
                <CurrrencyMenu
                  client={client}
                  activeCurrencyLabel={activeCurrencyLabel}
                  onCurrencyMenuClick={onCurrencyMenuClick}
                />
                <Cart client={client} activeCurrencyLabel={activeCurrencyLabel}/>
              </div>
            </div>
          </header>

          <div className="tab-content">
            {children.map((child) => {
              if (child.props.label !== activeTab) return undefined
              return child.props.children
            })}
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default NavBar
