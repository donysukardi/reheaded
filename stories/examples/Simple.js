import React from 'react'
import PropTypes from 'prop-types'
import { GoogleFont, TypographyStyle } from 'react-typography'

import Headroom from '../../src/index'
import typography from '../utils/typography'

import Header from '../components/Header'
import PageContent from '../components/PageContent'
import {
  Container,
  HeaderWrapper,
  ContentWrapper,
  Heading,
} from '../components/styles'

class Page extends React.Component {
  render() {
    const { onUnfix, onPin, onUnpin } = this.props

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Headroom onUnfix={onUnfix} onPin={onPin} onUnpin={onUnpin}>
          {({ setRef, height, state }) => (
            <div
              style={{
                height,
              }}
            >
              <Header
                innerRef={setRef}
                data-testid="headerContainer"
                data-state={state}
                state={state}
              >
                <Container>
                  <HeaderWrapper>
                    <Heading>reheaded</Heading>
                  </HeaderWrapper>
                </Container>
              </Header>
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
