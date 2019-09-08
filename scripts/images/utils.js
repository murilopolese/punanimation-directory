const http = require('http')
const https = require('https')

const getProtocol = function(url) {
	return url.indexOf('https://') == 0 ? https : http
}

const get = function(url) {
	return new Promise((resolve, reject) => {
		const request = getProtocol(url).get(url, function(resp) {
			let data = '';
			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
				data += chunk;
			});
			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				resolve(JSON.parse(data));
			});
		}).on('error', reject)
	})
}

module.exports = {
getProtocol,
get
}
