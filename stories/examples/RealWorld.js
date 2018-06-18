import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ClickOutside } from 'react-goodies'
import { GoogleFont, TypographyStyle } from 'react-typography'

import Headroom from '../../src/index'
import typography from '../utils/typography'

import Header from '../components/Header'
import BackToTop from '../components/BackToTop'
import PageContent from '../components/PageContent'
import {
  Container,
  HeaderWrapper,
  ContentWrapper,
  Heading,
} from '../components/styles'

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Nav = styled.nav`
  position: relative;
`

const NavPopper = styled.div`
  position: absolute;
  padding: 16px;
  left: -9999999px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  opacity: 1;
  background-color: white;
  min-width: 280px;

  ${props =>
    props.active &&
    `
    left: auto;
    right: 0;
    opacity: 1;

  `};
`

class Page extends React.Component {
  state = {
    navExpanded: false,
  }

  toggleNav = e => {
    e.preventDefault()
    this.setState(state => ({
      navExpanded: !state.navExpanded,
    }))
  }

  render() {
    const { onUnfix, onPin, onUnpin } = this.props

    const { navExpanded } = this.state

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Headroom onUnfix={onUnfix} onPin={onPin} onUnpin={onUnpin}>
          {({ setRef, height, state }) => (
            <div
              style={{
                height,
                marginBottom: '24px',
              }}
            >
              <Header
                innerRef={setRef}
                data-testid="headerContainer"
                data-state={state}
                state={state}
                forcePin={navExpanded}
              >
                <Container>
                  <HeaderWrapper>
                    <Menu>
                      <Heading>reheaded</Heading>
                      <ClickOutside
                        disabled={!navExpanded}
                        onClickOutside={this.toggleNav}
                      >
                        {({ setRef }) => (
                          <Nav innerRef={setRef}>
                            <button type="button" onClick={this.toggleNav}>
                              Menu
                            </button>
                            <NavPopper active={navExpanded}>
                              <ul>
                                <li>Menu Item 1</li>
                                <li>Menu Item 2</li>
                                <li>Menu Item 3</li>
                                <li>Menu Item 4</li>
                              </ul>
                            </NavPopper>
                          </Nav>
                        )}
                      </ClickOutside>
                    </Menu>
                  </HeaderWrapper>
                </Container>
              </Header>
              <BackToTop pinned={state !== 'unfixed'} />
            </div>
          )}
        </Headroom>
        <Container>
          <ContentWrapper>
            <PageContent />
          </ContentWrapper>
        </Container>
      </div>
    )
  }
}

Page.propTypes = {
  onUnfix: PropTypes.func,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
}

export default Page
