import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  &:not(:last-child) {
    /* padding-right: 32px; */
  }
  .tab-list-item {
    color: ${(props) => props.theme.colors.text_01};
    font-size: 16px;
    line-height: 120%;
    text-transform: uppercase;
  }

  .tab-list-active {
    color: ${(props) => props.theme.colors.primary_color};
    border-bottom: 2px solid ${(props) => props.theme.colors.primary_color};
  }
`

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { label, onClick } = this.props
    onClick(label)
  }

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this

    let className = 'tab-list-item'

    if (activeTab === label) {
      className += ' tab-list-active'
    }

    return (
      <Wrapper>
        <li className={className} onClick={onClick}>
          {label}
        </li>
      </Wrapper>
    )
  }
}

export default Tab
