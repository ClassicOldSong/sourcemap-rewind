#!/usr/bin/env node
'use strict'
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

require('../')(argv.i, argv.o).then(() => {
  const outputPath = path.resolve(argv.o)
  console.log(`Complete! You can find the resolved project at "${outputPath}"`)
})
