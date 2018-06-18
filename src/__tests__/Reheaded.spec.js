import React from 'react'
import PropTypes from 'prop-types'
import {cleanup, render, renderIntoDocument} from 'react-testing-library'
import 'jest-dom/extend-expect'

import Reheaded from '../Reheaded'

beforeEach(() => {
  jest
    .spyOn(global.window, 'requestAnimationFrame')
    .mockImplementation(cb => cb())
})

afterEach(() => {
  cleanup()
  global.window.requestAnimationFrame.mockRestore()
})

const getParent = () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  pageYOffset: 0,
  scrollHeight: 1200,
  offsetHeight: 50,
})

const ReheadedExample = ({reheadedRef, ...props}) => (
  <div style={{minHeight: '100vh'}}>
    <Reheaded {...props} ref={reheadedRef}>
      {({setRef, height, state}) => (
        <div
          data-testid="reheadedWrapper"
          style={{
            height,
          }}
        >
          <header ref={setRef} data-testid="headerContainer">
            <h1>This is header</h1>
            <div data-testid="ReheadedState">{state}</div>
          </header>
        </div>
      )}
    </Reheaded>
    <div>This is some content</div>
  </div>
)

ReheadedExample.propTypes = {
  reheadedRef: PropTypes.func,
}

test('Reheaded component renders properly', () => {
  const {getByTestId, container} = render(<ReheadedExample />)
  expect(getByTestId('ReheadedState')).toHaveTextContent('unfixed')
  expect(container.firstChild).toMatchSnapshot()
})

test('Reheaded does not register on resize event listener if calcHeightOnResize is false', () => {
  const parent = getParent()
  render(<ReheadedExample parent={() => parent} calcHeightOnResize={false} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls.length).toBe(1)
})

test('Reheaded didMount registers scroll event listener', () => {
  const parent = getParent()
  const {unmount} = render(<ReheadedExample parent={() => parent} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls[1][0]).toBe('resize')

  unmount()
  expect(parent.removeEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.removeEventListener.mock.calls[1][0]).toBe('resize')
})

test('Reheaded toggling disabled on should remove event listeners', () => {
  const parent = getParent()
  const parentFn = () => parent

  const {rerender} = render(<ReheadedExample parent={parentFn} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls[1][0]).toBe('resize')

  rerender(<ReheadedExample parent={parentFn} disabled />)

  expect(parent.removeEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.removeEventListener.mock.calls[1][0]).toBe('resize')
})

test('Reheaded toggling disabled off should add event listeners', () => {
  const parent = getParent()
  const parentFn = () => parent

  const {rerender} = render(<ReheadedExample parent={parentFn} disabled />)

  expect(parent.addEventListener).not.toHaveBeenCalled()

  rerender(<ReheadedExample parent={parentFn} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls[1][0]).toBe('resize')
})

test('Reheaded setHeightOffset updates the height in state', () => {
  const parent = getParent()
  let reheadedRef
  const setreheadedRef = ref => {
    reheadedRef = ref
  }

  const {getByTestId} = render(
    <ReheadedExample parent={() => parent} reheadedRef={setreheadedRef} />,
  )

  const height = '300px'
  reheadedRef.inner = {
    offsetHeight: height,
  }
  reheadedRef.setHeightOffset()
  expect(getByTestId('reheadedWrapper').style.height).toEqual(height)
})

test('Reheaded handle scroll', async () => {
  let reheadedRef
  const setreheadedRef = ref => {
    reheadedRef = ref
  }

  const onUnpinSpy = jest.fn()
  const onUnfixSpy = jest.fn()
  const onPinSpy = jest.fn()

  const parent = getParent()

  const {getByTestId} = renderIntoDocument(
    <ReheadedExample
      onPin={onPinSpy}
      onUnpin={onUnpinSpy}
      onUnfix={onUnfixSpy}
      parent={() => parent}
      reheadedRef={setreheadedRef}
    />,
  )

  parent.pageYOffset = 300
  reheadedRef.handleScroll()

  expect(getByTestId('ReheadedState')).toHaveTextContent('unpin')
  expect(onUnpinSpy).toHaveBeenCalledTimes(1)

  parent.pageYOffset = 180
  reheadedRef.handleScroll()

  expect(getByTestId('ReheadedState')).toHaveTextContent('pinned')
  expect(onPinSpy).toHaveBeenCalledTimes(1)

  parent.pageYOffset = 0
  reheadedRef.handleScroll()

  expect(getByTestId('ReheadedState')).toHaveTextContent('unfixed')
  expect(onUnfixSpy).toHaveBeenCalledTimes(1)
})

test('Reheaded derives scrollY from scrollTop', async () => {
  let reheadedRef
  const setreheadedRef = ref => {
    reheadedRef = ref
  }

  const parent = getParent()
  delete parent.pageYOffset
  parent.scrollTop = 30

  render(<ReheadedExample parent={() => parent} reheadedRef={setreheadedRef} />)

  expect(reheadedRef.getScrollY()).toEqual(30)
})

test('Reheaded getViewportHeight from window.innerHeight', async () => {
  let reheadedRef
  const setreheadedRef = ref => {
    reheadedRef = ref
  }

  window.innerHeight = 1200

  render(<ReheadedExample reheadedRef={setreheadedRef} />)

  expect(reheadedRef.getViewportHeight()).toEqual(1200)
})
