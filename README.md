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
