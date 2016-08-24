#!/usr/bin/env node

const argv = require('yargs')
	.option('i', {
		alias: 'input',
		demand: true,
		describe: 'Input file path',
		type: 'string'
	})
	.option('o', {
		alias: 'output',
		demand: false,
		default: './source',
		describe: 'Output folder path',
		type: 'string'
	})
	.usage('Usage: sourcemap-rewind [options]')
	.example('sourcemap-rewind -i main.js -o ./output')
	.help('h')
	.alias('h', 'help')
	.argv;

const rewind = require('../');

if (argv.i === '') {
	console.log('No input file specified! Use "sourcemap-rewind -h" to display help info.');
	process.exit(1);
}

rewind(argv.i, argv.o);