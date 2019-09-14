import React from 'react'
import Text from './Text.js'
import './Thumbnail.css'
import cloudinary from 'cloudinary-core';
import defaultThumb from '../assets/default.jpg'

var cl = new cloudinary.Cloudinary({
	cloud_name: 'hzbx4zqtw',
	secure: true
});

const getThumbnailUrl = function(entry) {
	const thumbnail = entry.thumbnail
	if (thumbnail) {
		const imageName = `${thumbnail.public_id}.${thumbnail.format}`
		return cl.url(imageName, {
				transformation: [ { width: 277, height: 198, crop: "fill" } ]
			}
		)
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
