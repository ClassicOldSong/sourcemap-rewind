#!/usr/bin/env node
'use strict'
const Promise = require('bluebird')
const path = require('path')

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
  .argv

if (argv.i === '') {
  console.log('No input file specified! Use "sourcemap-rewind -h" to display help info.')
  process.exit(1)
}

require('../')(argv.i, argv.o)
  .then(mapping => Promise.map(mapping, ({filePath, content}) => {
    console.log(`Processing ${filePath}`)
    const mkdirp = Promise.promisify(require('mkdirp'))
    const writeFile = Promise.promisify(require('fs').writeFile)
    return mkdirp(path.dirname(filePath))
      .then(() => writeFile(filePath, content))
  }))
  .then(() => {
    process.stdout.write('\r\x1b[K')
    process.stdout.write(`Complete! You can find the resolved project at "${path.resolve(argv.o)}"`)
  })
