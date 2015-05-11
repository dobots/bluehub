var http = require('http');
var fs = require('fs');

var express = require('express');
var app = express();

//http.createServer(function (request, response) {
app.get('/', function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
	listmodules(function(err, res) {
		if (err !== null) {
			console.log(err);
			response.end(err);
		} else {
			console.log(res);
			response.end(res);
		}
	});

	/*
   readdir('/data/data', function(err, res) {
      if (err) return;
      console.log(res);
      response.end(res);
   }); */
}).listen(8124);

var spawn = require('child_process').spawn;

function listmodules(callback) {
	var child = spawn('pm', ['list', 'packages', '-f']);
	var text = '';
	child.stdout.on('data', function(chunk) {
		text = text.concat(chunk);
	});
	child.on('close', function(code) {
		var err = null;
		if (code == 127) {
			err = 'Binary "pm" not present, or not found in PATH';
		} else if (code != 0) {
			err = "Error: " + code;
		} else {
			err = "Unknown error";
		}
		callback(err, text);
	});
}


function readdir(dir, res) {
   fs.readdir(dir, function(err, files) {
      if (err) {
         if (res) res(err, ''); else return;
      }
      var result = '';
      files.forEach(function(f) {
         result = result.concat('Package: ', f, '\n');
      });
      var single = result.split('\n')[0];
      console.log(single);
      if (res) res(false, result);
   });
}

console.log('Server running at http://127.0.0.1:8124/');
console.log('* find out your ip address through "ipconfig wlan0"');
