import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Thumbnail from '../components/Thumbnail.js'

import entriesRaw from '../data/entries.js'
let entry = entriesRaw.entries[0]

storiesOf('Thumbnail', module)
	.addDecorator(story => <div><div style={{ maxWidth: '300px' }}>{story()}</div><div style={{ maxWidth: '540px' }}>{story()}</div></div>)
	.add('Default', () => <Thumbnail entry={entry} onClick={action('clicked')} />)
