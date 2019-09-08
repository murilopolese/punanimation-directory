import React from 'react'
import './Text.css'

export default function Text(props) {
	let size = props.size || 'regular'
	let alignment = props.alignment || 'left'
	let letterSpacing = props.letterSpacing || 'regular'
	let weight = props.weight || 'regular'
  let uppercase = props.uppercase ? 'uppercase' : 'inherit'
  let classes = `${size}-size ${alignment}-align ${letterSpacing}-spacing ${weight}-weight ${uppercase}`
	switch (size) {
		case 'big-title':
			return (
				<h1 className={classes}>{props.children}</h1>
			)
		case 'small-title':
			return (
				<h2 className={classes}>{props.children}</h2>
			)
		default:
			return (
				<span className={classes}>
					{props.children}
				</span>
			)
	}
}
