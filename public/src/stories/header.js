import React from 'react'
import { storiesOf } from '@storybook/react';
import Header from '../components/Header.js'


storiesOf('Header', module)
	.add('Default', () => {
		return (
			<div>
				<Header>
					<h1>First child will disapear</h1>
					<p>When scrolling down this will stay</p>
				</Header>
				{[...new Array(100)].map(() => <p>Lorem Ipsum</p>)}
			</div>
		)
	})
