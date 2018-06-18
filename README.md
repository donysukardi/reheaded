# reheaded

[![travis build](https://img.shields.io/travis/donysukardi/reheaded.svg?style=flat-square)](https://travis-ci.org/donysukardi/reheaded)
[![version](https://img.shields.io/npm/v/reheaded.svg?style=flat-square)](http://npm.im/reheaded)
[![downloads](https://img.shields.io/npm/dm/reheaded.svg?style=flat-square)](http://npm-stat.com/charts.html?package=reheaded&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/reheaded.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

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

import { Reheaded } from 'reheaded'

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
