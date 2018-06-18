import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
`

const HeaderWrapper = styled.div`
  padding: 12px 48px;
`

const ContentWrapper = styled.div`
  padding: 24px 48px;
`

const Heading = styled.h1`
  margin: 0;
  color: rgb(252, 253, 254);
`

const CornerButtonWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2;
`

export {
  Container,
  HeaderWrapper,
  ContentWrapper,
  Heading,
  CornerButtonWrapper,
}
