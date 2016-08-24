'use strict'
const Promise = require('bluebird')
const {resolveSourceMapAsync, resolveSourcesAsync} = Promise.promisifyAll(require('source-map-resolve'))
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const mkdirp = Promise.promisify(require('mkdirp'))

module.exports = (rawPath, outPath) => {
  const rawContent = fs.readFileSync(rawPath).toString()

  return resolveSourceMapAsync(rawContent, rawPath, fs.readFile)
    .then(({map, sourcesRelativeTo}) => resolveSourcesAsync(map, sourcesRelativeTo, fs.readFile))
    .then(({sourcesResolved, sourcesContent}) => sourcesResolved.map((filePath, index) => ({
      filePath: `${outPath}${path.resolve('/', filePath)}`.replace(':', ''),
      content: sourcesContent[index]
    })))
    .then(mapping => Promise.map(mapping, ({filePath, content}) => {
      return mkdirp(path.dirname(filePath))
        .then(() => fs.writeFileAsync(filePath, content))
        .catch(() => Promise.reject(filePath))
        .then(() => filePath)
    }))
}
