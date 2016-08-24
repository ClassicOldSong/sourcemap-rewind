sourcemap-rewind
========

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/ClassicOldSong/sourcemap-rewind/master/LICENSE) [![npm](https://img.shields.io/npm/dt/sourcemap-rewind.svg?style=flat-square)](https://www.npmjs.com/package/sourcemap-rewind)

Rewind a compressed javascript to it's original project using sourcemap easily, such as your Borwserify project and Webpack project.

---

Usage
------------
Make sure you have your packed js file and sourmap are valid.

Use as a cli tool:

	$ sudo npm install sourcemap-rewind -g
	$ sourcemap-rewind -i app.js -o ./out

or

	$ npm install sourcemap-rewind

then

~~~ javascript
const rewind = require('sourcemap-rewind');
rewind('Input/file/path.js','Output/directory/path');
~~~


License
------------
[MIT](https://cos.mit-license.org/), &copy; [ClassicOldSong](https://github.com/ClassicOldSong)
