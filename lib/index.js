"use strict";

const through = require('through2');
const path = require('path');
const processTemplate = require('./process-template.js');
const fs = require('fs');

module.exports = function(b, opts){
	b.on('bundle', () => {
		let first = true;
		const template = getTemplate(opts);

		b.pipeline.get('wrap').push(through.obj(function(buf, enc, next){
			if(first){
				this.push(new Buffer(processTemplate(template)));
				first = false;
			}
			this.push(buf);
			next();
		}));
	});
};

function getTemplate(opts){
	return opts.template || getTemplateFromFile(opts.file) || getDefaultTemplate();
}

function getTemplateFromFile(file){
	return file && fs.readFileSync(file, 'utf-8');
}

function getDefaultTemplate(){
	return fs.readFileSync(path.join(__dirname, 'default.tpl'), 'utf-8');
}