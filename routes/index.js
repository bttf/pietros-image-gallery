var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataurl = require('dataurl');

var uploadsDir = 'public/uploads/';

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/upload', function(req, res, next) {
  var dataObj = dataurl.parse(req.param('data'));
  var filename = Date.now() + decodeURIComponent(req.param('filename')).replace(/[^a-z0-9_\-\.]/gi, '_').toLowerCase();
  var filepath = [uploadsDir, filename].join('');

  if (dataObj) {
    fs.writeFile(filepath, dataObj.data, function(err) {
      err ? next(err) : res.send(filename);
    });
  } else {
    next({ error: 'Unable to read data.' });
  }
});

module.exports = router;
