import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {linkTo} from '@storybook/addon-links'

import Simple from './examples/Simple'
import ForcePin from './examples/ForcePin'
import Disabled from './examples/Disabled'
import BackToTop from './examples/BackToTop'
import RealWorld from './examples/RealWorld'

storiesOf('Reheaded', module)
  .add('simple', () => (
    <Simple
      onPin={action('onPin')}
      onUnpin={action('onUnpin')}
      onUnfix={action('onUnfix')}
    />
  ))
  .add('back to top', () => (
    <BackToTop
      onPin={action('onPin')}
      onUnpin={action('onUnpin')}
      onUnfix={action('onUnfix')}
    />
  ))
  .add('forcePin', () => (
    <ForcePin
      onPin={action('onPin')}
      onUnpin={action('onUnpin')}
      onUnfix={action('onUnfix')}
    />
  ))
  .add('disabled', () => (
    <Disabled
      onPin={action('onPin')}
      onUnpin={action('onUnpin')}
      onUnfix={action('onUnfix')}
    />
  ))
  .add('real world', () => (
    <RealWorld
      onPin={action('onPin')}
      onUnpin={action('onUnpin')}
      onUnfix={action('onUnfix')}
    />
  ))
