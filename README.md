# reheaded

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![downloads][downloads-badge]][npmcharts] [![version][version-badge]][package]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]

[![Supports React and Preact][react-badge]][react]
[![size][size-badge]][unpkg-dist] [![gzip size][gzip-badge]][unpkg-dist]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]

Primitive to build simple and flexible sticky React header components

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [reheaded](#reheaded)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributors](#contributors)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
npm install --save reheaded
```

## Overview

The library exposes 3 different states for the header in relation to the parent container, i.e.
* `unfixed` - header is sitting on top of the container
* `unpinned` - container is scrolling down past the header height and gets hidden
* `pinned` - container is scrolling up and gets displayed

## Usage

```jsx
import React, { Component } from 'react'

import Reheaded from 'reheaded'

class Example extends Component {
  /* event hanlders */

  render() {
    return (
      <Reheaded
        onPin={this.onPin}
        onUnpin={this.onUnpin}
        onUnfix={this.onUnfix}
      >
        {({ setRef, height, state }) => (
          <div
            style={{
              height,
            }}
          >
            <Header innerRef={setRef} state={state}>
              Reheaded
            </Header>
          </div>
        )}
      </Reheaded>
    )
  }
}
```

## Props

| prop                 | type     | default        | description                                                                                                                |
| -------------------- | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `parent`             | `func`   | `() => window` | Callback returning parent container node                                                                                   |
| `children`           | `func`   |                | Render function that will receive [Children Render Props](#children-render-props)                                    |
| `upTolerance`        | `number` | `5`            | Scroll tolerance in px when scrolling up before component is pinned                                                        |
| `downTolerance`      | `number` | `5`            | Scroll tolerance in px when scrolling down before component is unpinned                                                    |
| `onPin`              | `func`   | `() => {}`     | Callback when the header gets pinned                                                                                       |
| `onUnpin`            | `func`   | `() => {}`     | Callback when the header gets unpinned                                                                                     |
| `onUnfix`            | `func`   | `() => {}`     | Callback when the header gets unfixed                                                                                      |
| `pinStart`           | `number` | `0`            | Height in px where the header should start and stop pinning. Useful when you have another element above Headroom component |
| `forcePin`           | `bool`   | `false`        | Flag to persist pinning, this sets the state to `'pinned'`                                                                                                   |
| `disabled`           | `bool`   | `false`        | Disable pinning and unpinning                                                                                              |
| `calcHeightOnResize` | `bool`   | `true`         | Flag to indicate whether height should be recalculated on parent resize                                                    |

## Chilren Render Props

| render prop         | type     | description                                                                                                                |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `setRef`            | `func`   | Scroll tolerance in px when scrolling down before component is unpinned                                                    |
| `state`             | `func`   | Callback returning parent container node                                                                                   |
| `shouldAnimate`     | `bool`   | Flag to apply CSS transition. Ref: [Animation](#animation)                                  |
| `height`            | `number` | Height of the container as set in `setRef`. Ref: [Sticky or Fixed](#sticky-or-fixed)                                                       |

## Recipes

### Basic Styling

You should apply the following basic styles to your header component based on the state prop received.

* `unfixed` - position: static
* `unpinned` - position: sticky/fixed and transform: translateY(-100%)
* `pinned` - position: sticky/fixed

### Sticky or Fixed

Using `position: fixed` for `pinned`/`unpinned` state is a bit tricky as element with fixed position does not contribute to the height of the container/window.

This way, when switching from `position: static` to `position: fixed`, the overall page height changes, affecting the scoll position.

To work around this, you have to wrap your header component and assign the height of your header to it, e.g.

```jsx
<Reheaded>
  {({ setRef, height, state }) => (
    <div style={{ height }}>
      <FixedHeader innerRef={setRef} state={state} />
    </div>
  )}
</Reheaded>
```

The same does not apply to `position: sticky`, hence you can safely ignore the height provided.

Ref: [Can I Use?](https://caniuse.com/#feat=css-sticky)

```jsx
<Reheaded>
  {({ setRef, state }) => (
    <StickyHeader innerRef={setRef} state={state} />
  )}
</Reheaded>
```

### Animation

If you'd like to add CSS animation to your header for smoother pinning/unpinning, Reheaded exposes `shouldAnimate` in the render function.
This value is only set to `true` if the state switches from `pinned` to `unpinned` or vice-versa.

This helps prevent the header from jumping when switching from `unfixed` to `unpinned` during initial scrolling as we will be animating on `transform` attribute.
The transition would happen from `unfixed` with `transform: none` or `translateY(0)` to `unpinned` with `transform: translateY(-100)`. Hence it's necessary not to enable transition during this switch.

### Example with styled-components

You can view the example styling with styled-components [here](https://github.com/donysukardi/reheaded/blob/master/stories/components/Header.js)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/410792?v=4" width="100px;"/><br /><sub><b>Dony Sukardi</b></sub>](http://dsds.io)<br />[💻](https://github.com/donysukardi/reheaded/commits?author=donysukardi "Code") [📖](https://github.com/donysukardi/reheaded/commits?author=donysukardi "Documentation") [💡](#example-donysukardi "Examples") [🤔](#ideas-donysukardi "Ideas, Planning, & Feedback") [👀](#review-donysukardi "Reviewed Pull Requests") [⚠️](https://github.com/donysukardi/reheaded/commits?author=donysukardi "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [donysukardi](https://github.com/donysukardi)

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/donysukardi/reheaded.svg?style=flat-square
[build]: https://travis-ci.org/donysukardi/reheaded
[coverage-badge]: https://img.shields.io/codecov/c/github/donysukardi/reheaded.svg?style=flat-square
[coverage]: https://codecov.io/github/donysukardi/reheaded
[version-badge]: https://img.shields.io/npm/v/reheaded.svg?style=flat-square
[package]: https://www.npmjs.com/package/reheaded
[downloads-badge]: https://img.shields.io/npm/dm/reheaded.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/reheaded
[license-badge]: https://img.shields.io/npm/l/reheaded.svg?style=flat-square
[license]: https://github.com/donysukardi/reheaded/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[react-badge]: https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-(p)react-00d8ff.svg?style=flat-square
[react]: https://facebook.github.io/react/
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/reheaded/dist/reheaded.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/reheaded/dist/reheaded.umd.min.js?label=size&style=flat-square
[unpkg-dist]: https://unpkg.com/reheaded/dist/
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
