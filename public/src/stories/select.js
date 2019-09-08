import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from '../components/Select.js'

let options = [
	{ type: 'button', label: 'Button', onClick: action('clicked on button') },
	{ id: 1, label: 'Option 1', onClick: action('clicked on option 1') },
	{ id: 2, label: 'Option 2', onClick: action('clicked on option 2') },
	{ type: 'separator', label: 'Others'  },
	{ id: 3, label: 'Option 3', selected: true, onClick: action('clicked on option 3')},
	{ id: 4, label: 'Option 4', onClick: action('clicked on option 4') },
	{ id: 5, label: 'None of the above', onClick: action('clicked on none of the above') }
]
storiesOf('Select', module)
	.addDecorator(story => <div><div style={{ maxWidth: '300px' }}>{story()}</div></div>)
	.add('Default', () => <Select>Lorem Ipsum</Select>)
	.add('Selected', () => <Select selected options={options}>Lorem Ipsum</Select>)
	.add('Open dialog', () => <div><Select open options={options} onChangeSearch={action('Search value changed')}>Lorem Ipsum</Select><div>This should go under</div></div>)
