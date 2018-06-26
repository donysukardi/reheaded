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
    (props.state !== 'unfixed') &&
    `
    position: ${props.sticky ? 'sticky' : 'fixed'};
  `} ${props =>
    props.state === 'unpinned' &&
    `
    transform: translateY(-100%);
  `} ${props =>
    props.shouldAnimate && `
    transition: transform .2s ease-in-out;
  `}
`

export default StyledHeader
