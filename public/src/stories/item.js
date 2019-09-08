import React from 'react'
import { storiesOf } from '@storybook/react';
import Item from '../components/Item.js'

let wrapperStyle = {
	display: 'flex',
	flexDirection: 'column',
	background: '#EDEDED'
}
storiesOf('Item', module)
	.addDecorator(story => <div style={wrapperStyle}>{story()}</div>)
	.add('Default', () => <Item>Item 1</Item>)
	.add('Selected', () => <Item selected>Item 1</Item>)
	.add('Button', () => <Item type="button">Button name</Item>)
	.add('Separator', () => <Item type="separator">Separator</Item>)
