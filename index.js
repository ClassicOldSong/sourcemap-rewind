"use strict";

const smr = require("source-map-resolve"),
	fs = require('fs'),
	path = require('path');

function mkdir(dirPath) {
	if (fs.existsSync(dirPath)) return;
	mkdir(path.dirname(dirPath));
	fs.mkdirSync(dirPath);
}

function writeFile(filePath, content) {
	mkdir(path.dirname(filePath));
	fs.writeFile(filePath, content);
}

function rewind(rawPath, outPath) {
	let rawContent = fs.readFileSync(rawPath).toString();

	smr.resolveSourceMap(rawContent, rawPath, fs.readFile, function(error, result) {
		if (error) {
			throw new Error(error);
		}

		smr.resolveSources(result.map, result.sourcesRelativeTo, fs.readFile, function(error, result) {
			if (error) {
				throw new Error(error);
			}
			for (let i in result.sourcesResolved) {
				let filePath = `${outPath}/${result.sourcesResolved[i]}`.replace(':', '');
				process.stdout.write('Processing ' + filePath + '\r');
				writeFile(filePath, result.sourcesContent[i]);
			}
			process.stdout.write("\r\x1b[K");
			process.stdout.write(`Complete! You can find the resolved project at "${path.resolve(outPath)}"\r\n`);
		});
	});
}


module.exports = rewind;