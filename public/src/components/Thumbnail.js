import React from 'react'
import Text from './Text.js'
import './Thumbnail.css'
import defaultThumb from '../assets/default.jpg'

const getThumbnailUrl = function(entry) {
	const thumbnail = entry.coverImage
	if (thumbnail) {
		return thumbnail
	} else {
		return defaultThumb
	}
}

export default function(props) {
	const entry = props.entry || {}
	const onClick = props.onClick || function() {}
	let imageUrl = getThumbnailUrl(entry)
	let bgStyle = {
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		backgroundImage: `url(${imageUrl})`
	}
	return (
		<div className="thumbnail" onClick={onClick}>
			<div className="image" style={bgStyle}></div>
			<p style={{textAlign: 'center'}}>
				<Text uppercase weight="bold" letterSpacing="comfortable">{entry.name} </Text>
				(<Text size="small" letterSpacing="wide">
						{entry.location.city}, {entry.location.country}
					</Text>)
			</p>
		</div>
	)
}
