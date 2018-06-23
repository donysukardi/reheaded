// Tell Babel to transform JSX into preact.h() calls:
/** @jsx preact.h */
/*
eslint-disable
react/prop-types,
no-console,
react/display-name,
import/extensions,
import/no-unresolved
*/

/*
Testing the preact version is a tiny bit complicated because
we need the preact build (the one that imports 'preact' rather
than 'react') otherwise things don't work very well.
So there's a script `test.build` which will run the cjs build
for preact before running this test.
 */

import preact from 'preact'
import render from 'preact-render-to-string'
import Reheaded from '../../../preact'

test('works with preact', () => {
  const childrenSpy = jest.fn(({
    setRef,
    height,
    state
  }) => (
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
  ))
  const ui = <Reheaded>{childrenSpy}</Reheaded>
  render(ui)
  expect(childrenSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      state: 'unfixed',
      height: 0
    }),
  )
})
