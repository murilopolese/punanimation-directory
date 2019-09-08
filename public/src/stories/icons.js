import React from 'react'
import { storiesOf } from '@storybook/react';
import Icon from '../components/Icon.js'

storiesOf('Icons', module)
	.addDecorator(story => <div style={{ width: '100px' }}>{story()}</div>)
	.add('Logo', () => <Icon name="logo"/>)
	.add('Arrow down', () => <Icon name="arrow-down"/>)
	.add('Link', () => <Icon name="link"/>)
	.add('Facebook', () => <Icon name="facebook"/>)
	.add('Vimeo', () => <Icon name="vimeo"/>)
	.add('Instagram', () => <Icon name="instagram"/>)
	.add('Mail', () => <Icon name="mail"/>)
	.add('Yellow', () => <Icon name="logo" color="#FCC438"/>)
