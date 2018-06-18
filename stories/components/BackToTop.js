import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transition: all 0.2s ease-in-out;
  ${props =>
    props.pinned
      ? `
    transform: translateY(-50%);
  `
      : `
    transform: translateX(100%) translateY(-50%);
  `};
`

const Button = styled.button`
  transform: rotate(-90deg) translateY(100%);
  padding: 0.5rem 1rem;
  border-radius: 8px 8px 0 0;
`

class BackToTop extends React.Component {
  handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const { pinned } = this.props
    return (
      <Wrapper pinned={pinned}>
        <Button type="button" onClick={this.handleClick}>
          Back to Top
        </Button>
      </Wrapper>
    )
  }
}

export default BackToTop
