import React from 'react'
import PropTypes from 'prop-types'
import { GoogleFont, TypographyStyle } from 'react-typography'

import Reheaded from '../../src/index'
import typography from '../utils/typography'

import Header from '../components/Header'
import BackToTop from '../components/BackToTop'
import PageContent from '../components/PageContent'
import {
  Container,
  HeaderWrapper,
  ContentWrapper,
  Heading,
  CornerButtonWrapper,
} from '../components/styles'

class Page extends React.Component {
  state = {
    forcePin: false,
  }

  toggleForcePin = () => {
    this.setState(state => ({
      forcePin: !state.forcePin,
    }))
  }

  render() {
    const { onUnfix, onPin, onUnpin } = this.props

    const { forcePin } = this.state

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Reheaded onUnfix={onUnfix} onPin={onPin} onUnpin={onUnpin}>
          {({ setRef, height, state }) => (
            <div
              style={{
                height
              }}
            >
              <Header
                innerRef={setRef}
                data-testid="headerContainer"
                data-state={state}
                state={state}
                forcePin={forcePin}
              >
                <Container>
                  <HeaderWrapper>
                    <Heading>reheaded</Heading>
                  </HeaderWrapper>
                </Container>
              </Header>
            </div>
          )}
        </Reheaded>
        <Container>
          <ContentWrapper>
            <PageContent />
          </ContentWrapper>
        </Container>
        <CornerButtonWrapper>
          <button
            data-testid="forcePinBtn"
            type="button"
            onClick={this.toggleForcePin}
          >
            {`Toggle Force Pin ${forcePin ? 'Off' : 'On'}`}
          </button>
        </CornerButtonWrapper>
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
