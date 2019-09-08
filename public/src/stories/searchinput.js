import React from 'react'
import { storiesOf } from '@storybook/react';
import SearchInput from '../components/SearchInput.js'

storiesOf('Search input', module)
	.add('Default', () => <SearchInput />)
