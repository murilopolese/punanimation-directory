var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Entry Model
 * ==========
 */
var Entry = new keystone.List('Entry');

Entry.add({
	name: { type: Types.Text, required: true, index: true, initial: true },
	coverImage: { type: Types.Url, required: false, initial: false },
	website: { type: Types.Url, initial: true },
	location: { type: Types.Relationship, ref: 'Location', refPath: 'city', initial: true },
	skills: { type: Types.Relationship, ref: 'Skill', refPath: 'name', many: true, initial: true },
	softwares: { type: Types.Relationship, ref: 'Software', refPath: 'name', many: true, initial: true }
});

/**
 * Registration
 */
Entry.defaultColumns = 'name';
Entry.register();
