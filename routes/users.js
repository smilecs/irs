var express = require('express');
var router = express.Router();
var request = require('http');
var model = require('../conf/schema');
var fs = require('fs');
var data = model.dataModel;

router.post('/upload', function(req, res, next) {
  console.log(req.file);
  //res.render('index', { title: 'Express' });
  request.get('/', function(response){

  });
});

module.exports = router;
