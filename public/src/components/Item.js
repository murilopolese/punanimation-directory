import React from 'react'
import './Item.css'

export default function(props) {
	let classes = `item`
	if (props.type) {
		classes += ` item-${props.type}`
	}
	if (props.selected) {
		classes += ` item-selected`
	}
	return (
		<div className={classes} {...props}>
			{props.children}
		</div>
	)
}
