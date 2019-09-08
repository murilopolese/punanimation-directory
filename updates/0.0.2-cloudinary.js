const keystone = require('keystone')
const Entry = keystone.list('Entry')
const images = require('./0.0.2-cloudinary.json')

function getCloudinaryObject(image) {
	return {
		public_id: image.public_id,
		version: image.version,
		signature: image.signature,
		format: image.format,
		resource_type: image.resource_type,
		url: image.url,
		width: image.width,
		height: image.height,
		secure_url: image.secure_url
	}
}

module.exports = (done) => {
	console.log('updating cloudinary files')
	let promises = images.map((image) => {
		return new Promise((resolve, reject) => {
			console.log('updating image for user', image.original_filename)
			let cloudinaryImage = getCloudinaryObject(image)
			Entry.model.findOne(
				{ _id: image.original_filename },
				(err, model) => {
					model.thumbnail = cloudinaryImage
					model.coverImage = image.secure_url
					model.save((err) => {
						if (err) return reject(err)
						resolve(image.original_filename)
					})
				}
			)
		})
	})

	Promise.all(promises).then((results) => {
		console.log('results', results.length)
		done()
	})
}
