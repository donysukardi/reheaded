import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background: rgb(57, 111, 176);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  position: relative;
  transform: translateY(0);

  ${props =>
    (props.forcePin || props.state !== 'unfixed') &&
    `
    position: ${props.sticky ? 'sticky' : 'fixed'};
    transition: transform .2s ease-in-out;
  `} ${props =>
    props.shouldHide &&
    !props.forcePin &&
    `
    transform: translateY(-100%)
  `};
`

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: props.state,
      shouldHide: props.state === 'unpinned',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state) {
      if (this.props.state === 'unpinned') {
        this.setState(
          {
            shouldHide: true,
          },
          () => {
            window.requestAnimationFrame(() => {
              this.setState({ state: 'unpinned' })
            })
          },
        )
      } else {
        this.setState({
          shouldHide: false,
          state: this.props.state,
        })
      }
    }
  }

  render() {
    const { state, forcePin, ...restProps } = this.props
    return (
      <StyledHeader
        {...restProps}
        state={this.state.state}
        shouldHide={this.state.shouldHide}
        forcePin={forcePin}
      />
    )
  }
}

Header.propTypes = {
  state: PropTypes.string.isRequired,
}

export default Header
