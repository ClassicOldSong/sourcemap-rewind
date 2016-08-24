'use strict'
const Promise = require('bluebird')
const resolveSourceMap = Promise.promisify(require('source-map-resolve').resolveSourceMap)
const resolveSources = Promise.promisify(require('source-map-resolve').resolveSources)
const fs = require('fs')
const path = require('path')

module.exports = (rawPath, outPath) => {
  const rawContent = fs.readFileSync(rawPath).toString()

  return resolveSourceMap(rawContent, rawPath, fs.readFile)
    .then(({map, sourcesRelativeTo}) => resolveSources(map, sourcesRelativeTo, fs.readFile))
    .then(({sourcesResolved, sourcesContent}) => sourcesResolved.map((filePath, index) => ({
      filePath: `${outPath}${path.resolve('/', filePath)}`.replace(':', ''),
      content: sourcesContent[index]
    })))
}
