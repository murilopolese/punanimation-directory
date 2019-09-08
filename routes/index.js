var keystone = require('keystone');
var restful = require('restful-keystone')(keystone);
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	// REST API
	restful.expose({
		Entry: {
			methods: ["retrieve", "list"],
			populate: ['location', 'skills', 'softwares']
		},
		Location: {
			methods: ["retrieve", "list"]
		},
		Skill: {
			methods: ["retrieve", "list"]
		},
		Software: {
			methods: ["retrieve", "list"]
		}
	}).start();
};
