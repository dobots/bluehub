var http = require('http');

var fs = require('fs');

http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   readdir('/data/data', function(err, res) {
      if (err) return;
      console.log(res);
      response.end(res);
   });
}).listen(8124);

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
