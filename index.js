'use strict'
const Promise = require('bluebird')
const {resolveSourceMapAsync, resolveSourcesAsync} = Promise.promisifyAll(require('source-map-resolve'))
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const mkdirpAsync = Promise.promisify(require('mkdirp'))

module.exports = (rawPath, outPath) => fs.readFileAsync(rawPath)
  .then(rawContent => resolveSourceMapAsync(rawContent.toString(), rawPath, fs.readFile))
  .then(({map, sourcesRelativeTo}) => resolveSourcesAsync(map, sourcesRelativeTo, fs.readFile))
  .then(({sourcesResolved, sourcesContent}) => sourcesResolved.map((filePath, index) => ({
    filePath: `${outPath}${path.resolve('/', filePath)}`.replace(/:/g, ''),
    content: sourcesContent[index]
  })))
  .map(({filePath, content}) => mkdirpAsync(path.dirname(filePath))
    .then(() => fs.writeFileAsync(filePath, content))
    .return(filePath))
