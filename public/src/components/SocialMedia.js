import React from 'react'
import Icon from './Icon.js'
import './SocialMedia.css'

function renderSocialMediaItem(item) {
	return (
		<div className="social-media-item">
			<a target="_blank" href={item.link} rel="noopener noreferrer">
				<Icon color="#FCC438" name={item.icon} />
			</a>
		</div>
	)
}

export default function(props) {
	let classes = `social-media ${props.large ? 'social-media-large' : ''}`
	return (
		<div className={classes}>
			{props.items.map(renderSocialMediaItem)}
		</div>
	)
}
