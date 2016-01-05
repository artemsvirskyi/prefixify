const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const browserify = require('browserify');
const bannerify = require('../lib');
const fs = require('fs');
const path = require('path');

describe('prefixify', () => {
	it('should add default prefix', (done) => {
		const processTemplate = require('../lib/process-template.js');
		const b = browserify();
		const defaultTemplatePath = path.join(__dirname, '../lib/default.tpl');
		const defaultTemplate = fs.readFileSync(defaultTemplatePath, 'utf-8');
		const defaultPrefix = processTemplate(defaultTemplate);

		b.add('./test/assets/some.js');
		b.plugin(bannerify);
		b.bundle((err, buff) => {
			assert(buff.toString().startsWith(defaultPrefix), 'bundle prefixed');
			done();
		});
	});

	it('should add prefix from template option', (done) => {
		const b = browserify();
		const template = 'Template prefix';

		b.add('./test/assets/some.js');
		b.plugin(bannerify, {template});
		b.bundle((err, buff) => {
			assert(buff.toString().startsWith(template), 'bundle prefixed');
			done();
		});
	});

	it('should add prefix from file option', (done) => {
		const b = browserify();
		const template = 'Template prefix';
		const file = path.join(__dirname, 'assets/file.tpl');

		b.add('./test/assets/some.js');
		b.plugin(bannerify, {file});
		b.bundle((err, buff) => {
			assert(buff.toString().startsWith(fs.readFileSync(file, 'utf-8')), 'bundle prefixed');
			done();
		});
	});
});