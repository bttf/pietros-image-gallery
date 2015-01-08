var fs = require('fs');
var dataurl = require('dataurl');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res, next) {
  var dataObj = dataurl.parse(req.param('data'));
  var filename = [Date.now(), '_', req.param('filename')].join('');
  console.log('debug: writing file %s ...', filename);
  fs.writeFile(['public/uploads/', filename].join(''), dataObj.data, function(err) {
    if (err) {
      console.log('err', err);
      next(err);
    } else {
      res.send(filename);
    }
  });
});

module.exports = router;
