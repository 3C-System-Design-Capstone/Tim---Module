const express = require('express');
// const db = require('../database/models.js');
// const Sequelize = require('sequelize');
// const { gt } = Sequelize.Op;


// TO USE: db.Products.aMethodHere
const mysql = require('mysql');
// const redis = require('redis');

var connection = mysql.createConnection({
  host: '13.52.45.76',
  user: 'yongsoo',
  password: 'yongsoolee',
  database: 'shoedidas',
});

var client = redis.createClient(6379, '13.52.45.76');
client.on('connect', function() {
  console.log('Redis client connected');
});
client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

const Controller = {
  get: (req, res) => {  
    client.get(req.query.id, ((error, success) => {
      if (success === null) {
        console.log('not found');
        connection.query(`select * from productDetails where id=${req.query.id}`, (err, result) => {
          if (err) {
            console.error(err);
          }
          res.status(200).send(result);
          console.log(JSON.stringify(result));
          client.set(req.query.id, JSON.stringify(result));
        });
      } else {
        console.log('found');
        console.log(JSON.parse(success));
        res.status(200).send(JSON.parse(success)); 
      }

      // if (error) {
        // console.log(error);
      // }
    // }));
  },

    // let category;
    // let response = [];
    // db.Products.findByPk(req.query.id)
    //   .then(data => {
    //     response.push(data.dataValues);
    //   //   category = data.dataValues.category;
    //   // })
    //   // .then(() => {
    //   //   // console.log(category);
    //   //   db.Products.findAll({ where: { category, id: { [gt]: req.query.id } }, limit: 16 })
    //   //     .then(data => {
    //   //       for ( let shoe of data ) {
    //   //         response.push(shoe.dataValues);
    //   //       }
    //   //     })
    //   //     .then(() => {
    //   //       // console.log(response);
    //         res.status(200).send(response)
    //       // })
    //       // .catch(err => console.error(err));
    //   })
    //   .catch(err => console.error(err));
  post: (req, res) => {
    res.send('hello from post');
  },

  update: (req, res) => {
    res.send('hello from update');
  },

  delete: (req, res) => {
    res.send('hello from delete');
  },
};

module.exports = { Controller };
