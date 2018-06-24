export default function(
  lastKnownScrollY = 0,
  currentScrollY = 0,
  props = {},
  state = {},
  height
) {
  const scrollDirection = currentScrollY >= lastKnownScrollY ? 'down' : 'up'
  const distanceScrolled = Math.abs(currentScrollY - lastKnownScrollY)

  // We're disabled
  if (props.disabled) {
    return {
      action: 'none',
      scrollDirection,
      distanceScrolled,
    }
    // We're at the top and not fixed yet.
  } else if (currentScrollY <= props.pinStart && state.state !== 'unfixed') {
    return {
      action: 'unfix',
      scrollDirection,
      distanceScrolled,
    }
    // We're unfixed and headed down. Carry on.
  } else if (
    currentScrollY <= height &&
    scrollDirection === 'down' &&
    state.state === 'unfixed'
  ) {
    return {
      action: 'none',
      scrollDirection,
      distanceScrolled,
    }
    // We're past the header and scrolling down.
    // We transition to "unpinned" if necessary.
  } else if (
    scrollDirection === 'down' &&
    ['pinned', 'unfixed'].indexOf(state.state) >= 0 &&
    currentScrollY > height + props.pinStart &&
    distanceScrolled > props.downTolerance
  ) {
    return {
      action: 'unpin',
      scrollDirection,
      distanceScrolled,
    }
    // We're scrolling up, we transition to "pinned"
  } else if (
    scrollDirection === 'up' &&
    distanceScrolled > props.upTolerance &&
    ['pinned', 'unfixed'].indexOf(state.state) < 0
  ) {
    return {
      action: 'pin',
      scrollDirection,
      distanceScrolled,
    }
    // We're scrolling up, and inside the header.
    // We transition to pin regardless of upTolerance
  } else if (
    scrollDirection === 'up' &&
    currentScrollY <= height &&
    ['pinned', 'unfixed'].indexOf(state.state) < 0
  ) {
    return {
      action: 'pin',
      scrollDirection,
      distanceScrolled,
    }
  }

  return {
    action: 'none',
    scrollDirection,
    distanceScrolled,
  }
}
