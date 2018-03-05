var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Software Model
 * ==========
 */
var Software = new keystone.List('Software');

Software.add({
	name: { type: Types.Text, required: true, index: true, initial: true }
});

/**
 * Registration
 */
Software.defaultColumns = 'name';
Software.register();
