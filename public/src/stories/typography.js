import React from 'react'
import { storiesOf } from '@storybook/react';
import Text from '../components/Text.js'

let textFiller = (props) => {
	return (
		<Text {...props}>
			<p>Lorem ipsum dolor sit amet dolor <strong>bold statement</strong> dolor sit amet lorem idilis <a href="/">link</a></p>
		</Text>
	)
}
storiesOf('Typography', module)
	.add('Default', () => textFiller())
	.add('Small size', () => textFiller({size: 'small'}))
	.add('Medium size', () => textFiller({size: 'medium'}))
	.add('Large size', () => textFiller({size: 'large'}))
	.add('Bold', () => textFiller({weight: 'bold'}))
	.add('Semi-bold', () => textFiller({weight: 'semi-bold'}))
	.add('Narrow letter spacing', () => textFiller({letterSpacing: 'narrow'}))
	.add('Normal letter spacing', () => textFiller({letterSpacing: 'normal'}))
	.add('Comfortable letter spacing', () => textFiller({letterSpacing: 'comfortable'}))
	.add('Wide letter spacing', () => textFiller({letterSpacing: 'wide'}))
	.add('Centered aligned', () => textFiller({alignment: 'center'}))
	.add('Right Aligned', () => textFiller({alignment: 'right'}))
	.add('Uppercase', () => textFiller({uppercase: true}))
	.add('Small title', () => textFiller({size: 'small-title'}))
	.add('Big title', () => textFiller({size: 'big-title'}))
