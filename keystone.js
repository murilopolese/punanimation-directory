// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

keystone.init({
	'name': 'panimation',
	'brand': 'panimation',

	'static': 'public',
	'favicon': 'public/media/favicon0.ico',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Admin',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));
keystone.set('cors allow origin', true);

keystone.start();
