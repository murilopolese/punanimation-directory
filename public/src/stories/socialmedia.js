import React from 'react'
import { storiesOf } from '@storybook/react';
import SocialMedia from '../components/SocialMedia.js'

let socialMediaItems = [
	{ icon: 'facebook', link: 'https://facebook.com' },
	{ icon: 'vimeo', link: 'https://vimeo.com' },
	{ icon: 'instagram', link: 'https://instagram.com' }
]
storiesOf('Social Media', module)
	.add('Default', () => <SocialMedia items={socialMediaItems}/>)
	.add('Large', () => <SocialMedia large items={socialMediaItems}/>)
