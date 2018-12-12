// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const router = require('./routes/routes');

// // const db = require('../database/index.js');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use('/shoedidas', router);


const http = require('http');

http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/html'}); // http header
  res.write('<h1>Hello World!<h1>'); //write a response
  res.end(); //end the response
}).listen(3000, () => {
 console.log("server start at port 3000"); //the server object listens on port 3000
});

module.exports = { http };
