import { Component } from 'react'
import PropTypes from 'prop-types'
import shallowequal from 'shallowequal'
import 'raf/polyfill';

import shouldUpdate from './shouldUpdate'

const noop = () => {}

class Reheaded extends Component {

  constructor (props) {
    super(props)
    // Class variables.
    this.currentScrollY = 0
    this.lastKnownScrollY = 0
    this.scrollTicking = false
    this.resizeTicking = false
    this.state = {
      state: 'unfixed',
      height: 0,
    }
  }

  setRef = ref => {
    this.inner = ref;
  }

  setHeightOffset = () => {
    this.setState({
      height: this.inner.offsetHeight,
    })
    this.resizeTicking = false
  }

  getScrollY = () => {
    const parent = this.props.parent();
    /* istanbul ignore else  */
    if (parent.pageYOffset !== undefined) {
      return parent.pageYOffset
    } else if (parent.scrollTop !== undefined) {
      return parent.scrollTop
    }
    /* istanbul ignore next line */
    return (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  getViewportHeight = () => (
    /* istanbul ignore next line */
    window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight
  )

  getDocumentHeight = /* istanbul ignore next */ () => {
    const { body, documentElement } = document;
    return Math.max(
      body.scrollHeight, documentElement.scrollHeight,
      body.offsetHeight, documentElement.offsetHeight,
      body.clientHeight, documentElement.clientHeight
    )
  }

  getElementPhysicalHeight = elm => Math.max(
    elm.offsetHeight,
    elm.clientHeight
  )

  getElementHeight = elm => Math.max(
    elm.scrollHeight,
    elm.offsetHeight,
    elm.clientHeight,
  )

  getScrollerPhysicalHeight = () => {
    const parent = this.props.parent()

    return (parent === window || parent === document.body)
      ? /* istanbul ignore next */ this.getViewportHeight()
      : this.getElementPhysicalHeight(parent)
  }

  getScrollerHeight = () => {
    const parent = this.props.parent()

    return (parent === window || parent === document.body)
      ? /* istanbul ignore next */ this.getDocumentHeight()
      : this.getElementHeight(parent)
  }

  isOutOfBound = (currentScrollY) => {
    const pastTop = currentScrollY < 0;

    const scrollerPhysicalHeight = this.getScrollerPhysicalHeight();
    const scrollerHeight = this.getScrollerHeight();

    const pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight;

    return pastTop || pastBottom;
  }

  handleScroll = () => {
    /* istanbul ignore else  */
    if (!this.scrollTicking) {
      this.scrollTicking = true
      window.requestAnimationFrame(this.update)
    }
  }

  handleResize = /* istanbul ignore next */ () => {
    /* istanbul ignore else  */
    if (!this.resizeTicking) {
      this.resizeTicking = true
      window.requestAnimationFrame(this.setHeightOffset)
    }
  }

  unpin = () => {
    this.props.onUnpin()
    this.setState({
      state: 'unpinned'
    })
  }

  pin = () => {
    this.props.onPin()
    this.setState({
      state: 'pinned',
    })
  }

  unfix = () => {
    this.props.onUnfix()
    this.setState({
      state: 'unfixed',
    })
  }

  update = () => {
    this.currentScrollY = this.getScrollY();
    /* istanbul ignore else  */
    if (!this.isOutOfBound(this.currentScrollY)) {
      const { action } = shouldUpdate(
        this.lastKnownScrollY,
        this.currentScrollY,
        this.props,
        this.state
      )

      /* istanbul ignore else  */
      if (action === 'pin') {
        this.pin()
      } else if (action === 'unpin') {
        this.unpin()
      } else if (action === 'unfix') {
        this.unfix()
      }
    }

    this.lastKnownScrollY = this.currentScrollY
    this.scrollTicking = false
  }

  componentDidMount () {
    const { disabled, parent: parentFn, calcHeightOnResize } = this.props;
    this.setHeightOffset();
    if (!disabled) {
      const parent = parentFn();
      parent.addEventListener('scroll', this.handleScroll)
      if (calcHeightOnResize) {
        parent.addEventListener('resize', this.handleResize)
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      !shallowequal(this.props, nextProps) ||
      !shallowequal(this.state, nextState)
    )
  }

  componentDidUpdate (prevProps) {
    const parent = this.props.parent();
    if (this.props.disabled && !prevProps.disabled) {
      this.unfix()
      parent.removeEventListener('scroll', this.handleScroll)
      parent.removeEventListener('resize', this.handleResize)
    } else if (!this.props.disabled && prevProps.disabled) {
      parent.addEventListener('scroll', this.handleScroll);
      /* istanbul ignore else  */
      if (this.props.calcHeightOnResize) {
        parent.addEventListener('resize', this.handleResize);
      }
    }
  }

  componentWillUnmount () {
    const parent = this.props.parent();
    parent.removeEventListener('scroll', this.handleScroll);
    /* istanbul ignore else  */
    if(parent !== window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    parent.removeEventListener('resize', this.handleResize);
  }

  render () {
    const { children } = this.props

    return (
      children({
        setRef: this.setRef,
        ...this.state,
      })
    )
  }
}

Reheaded.propTypes = {
  parent: PropTypes.func,
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  upTolerance: PropTypes.number,
  downTolerance: PropTypes.number,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
  onUnfix: PropTypes.func,
  pinStart: PropTypes.number,
  calcHeightOnResize: PropTypes.bool,
};

Reheaded.defaultProps = {
  parent: () => window,
  disabled: false,
  upTolerance: 5,
  downTolerance: 5,
  onPin: noop,
  onUnpin: noop,
  onUnfix: noop,
  pinStart: 0,
  calcHeightOnResize: true,
};

export default Reheaded;
