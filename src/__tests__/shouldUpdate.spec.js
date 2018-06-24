/* eslint-disabled no-unused-expressions */
import shouldUpdate from '../shouldUpdate'

let propDefaults = {}

describe('shouldUpdate', () => {
  beforeEach(() => {
    propDefaults = {
      disabled: false,
      upTolerance: 0,
      downTolerance: 0,
      offset: 0,
      pinStart: 0,
    }
  })

  it('should exist', () => {
    expect(shouldUpdate).toBeDefined()
  })

  it('should return an object', () => {
    expect(shouldUpdate()).toBeInstanceOf(Object)
  })

  // Test scrolling direction detection.
  it('should report scrolling down when currentScroll is greater than lastKnownScrollY', () => {
    expect(shouldUpdate(0, 10).scrollDirection).toEqual('down')
  })

  it('should report scrolling upwhen currentScroll is less than lastKnownScrollY', () => {
    expect(shouldUpdate(10, 0).scrollDirection).toEqual('up')
  })

  // Test action logic.
  it('should return an action of "none" if it\'s disabled', () => {
    propDefaults.disabled = true
    const result = shouldUpdate(0, 10, propDefaults)
    expect(result.action).toEqual('none')
  })

  it('should return an action of "none" if scrolling down and already unpinned', () => {
    const state = {
      state: 'unpinned',
    }
    const result = shouldUpdate(0, 10, propDefaults, state, 0)
    expect(result.action).toEqual('none')
  })

  it('should return an action of "none" if scrolling up and already pinned', () => {
    const state = {
      state: 'pinned',
    }
    const result = shouldUpdate(100, 90, propDefaults, state, 0)
    expect(result.action).toEqual('none')
  })

  it('should return an action of `unpin` if scrolling down and pinned', () => {
    const state = {
      state: 'pinned',
    }
    const result = shouldUpdate(0, 10, propDefaults, state, 0)
    expect(result.action).toEqual('unpin')
  })

  it(
    'should not return an action of `unpin` if scrolling down and unfixed ' +
      'but the scrolling amount is less than pinStart',
    () => {
      propDefaults.pinStart = 200
      const state = {
        state: 'unfixed',
      }
      const result = shouldUpdate(100, 110, propDefaults, state, 0)
      expect(result.action).toEqual('none')
    },
  )

  it(
    'should not return an action of `unpin` if scrolling down and pinned ' +
      'but the scrolling amount is less than downTolerance',
    () => {
      propDefaults.downTolerance = 1000
      const state = {
        state: 'pinned',
      }
      const result = shouldUpdate(100, 110, propDefaults, state, 0)
      expect(result.action).toEqual('none')
    },
  )

  it('should return an action of `pin` if scrolling up and unpinned', () => {
    const state = {
      state: 'unpinned',
    }
    const result = shouldUpdate(10, 1, propDefaults, state, 0)
    expect(result.action).toEqual('pin')
  })

  it(
    'should not return an action of `pin` if scrolling up and unpinned' +
      'but the scrolling amount is less than upTolerance',
    () => {
      propDefaults.upTolerance = 1000
      const state = {
        state: 'unpinned',
      }
      const result = shouldUpdate(110, 100, propDefaults, state, 0)
      expect(result.action).toEqual('none')
    },
  )

  it("should return an action of 'none' if haven't scrolled past height of header", () => {
    const state = {
      state: 'unfixed',
    }
    const result = shouldUpdate(0, 10, propDefaults, state, 100)
    expect(result.action).toEqual('none')
  })

  it(
    'should return an action of `none` if scrolling up ' +
      'when pinned within height of header',
    () => {
      const state = {
        state: 'pinned',
      }
      const result = shouldUpdate(50, 10, propDefaults, state, 100)
      expect(result.action).toEqual('none')
    },
  )

  it(
    'should return an action of `pin` if scrolling up when unpinned within height of header ' +
      'regardless of the upTolerance value',
    () => {
      propDefaults.upTolerance = 1000
      let state = {
        state: 'unpinned',
      }
      let result = shouldUpdate(50, 10, propDefaults, state, 100)

      expect(result.action).toEqual('pin')

      state = {
        state: 'unpinned',
      }
      result = shouldUpdate(50, 1, propDefaults, state, 100)
      expect(result.action).toEqual('pin')
    },
  )

  it(
    'should return an action of `none` if scrolling down ' +
      'when pinned within height of header',
    () => {
      const state = {
        state: 'pinned',
      }
      const result = shouldUpdate(50, 80, propDefaults, state, 100)
      expect(result.action).toEqual('none')
    },
  )

  it(
    'should return an action of `none` if scrolling up ' +
      'when pinned within height of header or at the top',
    () => {
      const state = {
        state: 'pinned',
      }
      const result = shouldUpdate(100, 1, propDefaults, state, 100)

      expect(result.action).toEqual('none')
    },
  )

  it("should return an action of 'unfix' if currentScroll is less than or equal to pinStart", () => {
    propDefaults.pinStart = 20
    const state = {
      state: 'pinned',
    }
    let result = shouldUpdate(100, 10, propDefaults, state, 100)

    expect(result.action).toEqual('unfix')

    result = shouldUpdate(100, 20, propDefaults, state)

    expect(result.action).toEqual('unfix')
  })

  it("should not return an action of 'unfix' if currentScroll is more than pinStart", () => {
    propDefaults.pinStart = 20
    const state = {
      state: 'pinned',
    }
    const result = shouldUpdate(100, 50, propDefaults, state, 100)

    expect(result.action).toEqual('none')
  })

  it("should return an action of 'unpin' if scroll down past height of header", () => {
    const state = {
      state: 'unfixed',
    }
    const result = shouldUpdate(100, 110, propDefaults, state, 100)
    expect(result.action).toEqual('unpin')
  })
})
