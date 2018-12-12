const mysql = require('mysql');
const redis = require('redis');

var connection = mysql.createConnection({
  host: '13.52.45.76',
  user: 'yongsoo',
  password: 'yongsoolee',
  database: 'shoedidas',
});

var client = redis.createClient(6379, '54.183.158.196');
client.on('connect', function() {
  // console.log('Redis client connected');
});
client.on('error', function (err) {
  // console.log('Something went wrong ' + err);
});

const http = require('http');
const fs = require('fs');

const requestHandler = function(request, response) {

  if (request.method === 'GET') {
    
    if (request.url === '/' ) {
      fs.readFile('./client/dist/index.html', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
      });
    }

    if (request.url === '/stylesheet/styles.css') {
      fs.readFile('./client/dist/stylesheet/styles.css', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
    }

    if (request.url === '/bundle.js') {
      fs.readFile('./client/dist/bundle.js', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
      });
      
    } else {
      response.writeHead(200, {
        // 'access-control-allow-origin': '*',
        // 'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        // 'access-control-allow-headers': 'content-type, accept',
        // 'access-control-max-age': 10,
        'Content-Type': 'application/json'
      });

      if (request.url.includes('loaderio')) {
        response.end('loaderio-eb4d159302600ef21d80f66b3273092d'); 
      } else if (request.url.includes('shoedidas')) {

        // console.log(request);

        let id = request.url.split('=')[1];

        client.get(id, (error, success) => {
          if (error) {
            console.error(error);
          } else {
            if (success === null) {
              // console.log(`id ${id} not found in redis`);
              // console.log(success);
              // var connection = mysql.createConnection({
              //   host: '13.52.45.76',
              //   user: 'yongsoo',
              //   password: 'yongsoolee',
              //   database: 'shoedidas',
              // });
              connection.query(`select * from productDetails where id=${id} limit 1`, (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  let string = JSON.stringify(result);
                  // console.log(string);
                  response.end(string);
                  client.set(id, string);
                }
              });
            } else {
              // console.log(`id ${id} found in redis`);
              // console.log(success);
              response.end(success); 
            }
          }
        });
      }
    }
  }
};


var server = http.createServer(requestHandler).listen(3000);