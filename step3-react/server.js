/**
 * https://www.npmjs.com/package/formidable
 * http://shiya.io/simple-file-upload-with-express-js-and-formidable-in-node-js/
 * https://expressjs.com/en/starter/basic-routing.html
 */

var express = require('express');
var formidable = require('formidable');

var app = express();
app.use(express.static(__dirname));

// GET
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// POST
app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	var index, filename;

	form.parse(req);

	form.on('field', function(name, value) {
		if (name == 'index') index = value;
	});

	form.on('fileBegin', function(name, file) {
		file.path = __dirname + '/uploads/' + file.name;
	});
	
	form.on('file', function(name, file) {
		filename = file.name;
	});

	form.on('end', function() {
		res.json({
			index: index,
			filename: filename
		});
	});

	form.on('error', function () {
		res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
	});
});

// Run server
app.listen(3000, function () {
	console.log("Server listening at http://localhost:3000.");
});