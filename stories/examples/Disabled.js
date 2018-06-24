import React from 'react'
import PropTypes from 'prop-types'
import { GoogleFont, TypographyStyle } from 'react-typography'

import Reheaded from '../../src/index'
import typography from '../utils/typography'

import Header from '../components/Header'
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
    disabled: false,
  }

  toggleDisabled = () => {
    this.setState(state => ({
      disabled: !state.disabled,
    }))
  }

  render() {
    const { onUnfix, onPin, onUnpin } = this.props

    const { disabled } = this.state

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Reheaded
          disabled={disabled}
          onUnfix={onUnfix}
          onPin={onPin}
          onUnpin={onUnpin}
        >
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
            data-testid="disabledButton"
            type="button"
            onClick={this.toggleDisabled}
          >
            {`Toggle Disabled ${disabled ? 'Off' : 'On'}`}
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
