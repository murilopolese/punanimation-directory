import React from 'react'
import Text from './Text.js'
import Icon from './Icon.js'
import './Backdrop.css'
import './Card.css'

export default function(props) {
	let entry = props.entry || {}
	let classes = 'card'
	if (props.width) {
		classes += ` card-width-${props.width}`
	}
	return (
		<div className={classes}>
				<Text size="small-title">{entry.name}</Text>
				<Text>{entry.location.city}, {entry.location.country}</Text>
				<div className="card-subtitle">
					<Text size="small-title">Skills</Text>
				</div>
				<Text>{entry.skills.map((e) => e.name).join(', ')}</Text>
				<div className="card-subtitle">
					<Text size="small-title">Softwares</Text>
				</div>
				<Text>{entry.softwares.map((e) => e.name).join(', ')}</Text>
				<div className="card-link">
					<a href={entry.website} target="_blank" rel="noopener noreferrer">
						<Icon name="link" />
					</a>
				</div>
		</div>
	)
}
