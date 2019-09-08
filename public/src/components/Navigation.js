import React from 'react'
import Text from './Text.js'
import './Navigation.css'

function renderItem(item, mobile) {
	let target = item.target || '_self'
	let textSize = 'regular'
	if (mobile) {
		textSize = 'medium'
	}
	return (
		<div className="nav-item">
			<Text uppercase size={textSize} weight="semi-bold" letterSpacing="wide">
				<a href={item.link} target={target}>
					{item.label}
				</a>
			</Text>
		</div>
		)
}

export default function(props) {
	let classes = 'navigation'
	let mobile = props.mobile
	if (mobile) {
		classes += ' navigation-mobile'
	}
	return (
		<div className={classes}>
			{props.items.map(item => renderItem(item, mobile))}
		</div>
	)
}
