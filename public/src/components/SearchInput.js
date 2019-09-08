import React from 'react'
import Icon from './Icon.js'
import './SearchInput.css'

export default function(props) {
	return (
		<div className="search-input">
			<input type="text" {...props}/>
			<div className="search-icon">
				<Icon name="search" />
			</div>
		</div>
	)
}
