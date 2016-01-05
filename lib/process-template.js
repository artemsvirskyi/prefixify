const template = require('lodash').template;
const moment = require('moment');
const path = require('path');
const pkg = require(path.resolve('package.json'));

module.exports = (tpl) => {
	const compiled = template(tpl);
	return compiled({pkg, moment});
};