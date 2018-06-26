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
} from '../components/styles'

class Page extends React.Component {
  render() {
    const { sticky, onUnfix, onPin, onUnpin } = this.props

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Reheaded calcHeightOnResize={!sticky} onUnfix={onUnfix} onPin={onPin} onUnpin={onUnpin}>
          {({ setRef, height, ...restProps }) => {
            const content = (
              <Header
                innerRef={setRef}
                data-testid="headerContainer"
                data-state={restProps.state}
                sticky={sticky}
                {...restProps}
              >
                <Container>
                  <HeaderWrapper>
                    <Heading>reheaded</Heading>
                  </HeaderWrapper>
                </Container>
              </Header>
            )

            return sticky
              ? content
              : <div style={{ height }}>{content}</div>
          }}
        </Reheaded>
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
  sticky: PropTypes.bool,
  onUnfix: PropTypes.func,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
}

export default Page
