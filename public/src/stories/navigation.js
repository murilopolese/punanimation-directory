import React from 'react'
import { storiesOf } from '@storybook/react';
import Navigation from '../components/Navigation.js'

let navItems = [
	{ label: 'About', link: '#', target: '_blank' },
	{ label: 'Join', link: '#', target: '_self' },
	{ label: 'Support' }
]
storiesOf('Navigation', module)
	.add('Default', () => <Navigation items={navItems} />)
	.add('Mobile', () => <Navigation mobile items={navItems} />)
