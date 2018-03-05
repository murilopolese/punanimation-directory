var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Skill Model
 * ==========
 */
var Skill = new keystone.List('Skill');

Skill.add({
	name: { type: Types.Text, required: true, index: true, initial: true },
	extra: { type: Types.Boolean, index: true, initial: true }
});

/**
 * Registration
 */
Skill.defaultColumns = 'name, extra';
Skill.register();
