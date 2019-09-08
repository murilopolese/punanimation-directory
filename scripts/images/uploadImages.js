const fs = require('fs').promises
const cloudinary = require('cloudinary').v2
const async = require('async')
const getProtocol = require('./utils.js').getProtocol
const get = require('./utils.js').get

// DEV
// cloudinary.config({
//   cloud_name: 'hdcmjp16l',
//   api_key: '322369592186286',
//   api_secret: 'i4Osy53_OVC8eHuGyD-jwD94e7w'
// });
// PROD
cloudinary.config({
  cloud_name: 'hzbx4zqtw',
  api_key: '448682334388817',
  api_secret: 'Uk-dlzXUTntxhNP6D7XU82OPZ-w'
});

const upload = (file) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(file, (error, result) => {
			if (error) return reject(error)
			resolve(result)
		})
	})
}
let results = {}

const main = async () => {
	let data = await fs.readdir('./original')
	for (let file in data) {
		let fileName = data[file]
		let id = fileName.substr(0, fileName.length-4)
		console.log('Uploading', fileName)
		try {
			results[id] = await upload(`./original/${fileName}`)
			await fs.appendFile(
				'cloudinary',
				`${JSON.stringify(results[id])}\n`,
				'utf8'
			)
			await fs.rename(
				`./original/${fileName}`,
				`./uploaded/${fileName}`
			)
		} catch (e) {
			console.log(e)
		}
		console.log('Done')
	}
	console.log(results)
}

main()
