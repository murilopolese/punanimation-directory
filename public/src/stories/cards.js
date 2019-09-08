import React from 'react'
import { storiesOf } from '@storybook/react';
import Card from '../components/Card.js'

import entriesRaw from '../data/entries.js'
let entry = entriesRaw.entries[0]

storiesOf('Card', module)
	.add('Default', () => <Card entry={entry} />)
