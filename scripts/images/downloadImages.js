const fs = require('fs')
const getProtocol = require('./utils.js').getProtocol
const get = require('./utils.js').get

const download = function(url, dest) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(dest)
		const request = getProtocol(url).get(url, function(response) {
			response.pipe(file)
			file.on('finish', function() {
				file.close((err) => {
					if (err) return reject(err)
					resolve()
				})
			})
			file.on('error', reject)
		}).on('error', reject)
	})
}

const main = async () => {
	let data = await get('http://www.panimation.tv/api/entries')
	console.log('entries found', data.entries.length)
	let list = data.entries.reduce((acc, entry) => {
		if (entry.coverImage !== 'https://i.imgur.com/Hc0Ok0V.jpg') {
			acc[entry._id] = entry.coverImage
		}
		return acc
	}, {})
	for (id in list) {
		console.log(id, list[id])
		try {
			if (
				list[id].toLowerCase().indexOf('.jpg') !== -1
				|| list[id].toLowerCase().indexOf('.jpeg') !== -1
			) {
				await download(list[id], `original/${id}.jpg`)
			}
			if (list[id].toLowerCase().indexOf('.gif') !== -1) {
				await download(list[id], `original/${id}.gif`)
			}
		} catch (e) {
			console.log('error', e)
		}
	}
}

main()
