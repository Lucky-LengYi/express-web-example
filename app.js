var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var bookmarksHelper = require('./bookmarks-helper');

var bookmarks = bookmarksHelper();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('.html', ejs.__express);
app.use(express.static('public'));
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/bookmarks', function(req, res) {
  res.send(bookmarks);
});

app.post('/bookmark', function (req, res) {
  var tmp = {};

  var randomNum;
  var isExist = false;

  do {
    randomNum = parseInt(Math.random() * 1000);
    bookmarks.forEach(function (item) {
      if (randomNum === item.id){
        isExist = true;
      }
    });
  } while (isExist);

  tmp.id = randomNum;
  tmp.title = req.body.bookmarkName;
  tmp.address = req.body.bookmarkAddress;
  tmp.created = Date.parse(new Date()) / 1000;
  bookmarks.push(tmp);
  res.send(bookmarks);
});

app.delete('/bookmarks', function (req, res) {
  var id = parseInt(req.query.id);

  bookmarks.forEach(function (item, i) {
    if (id === item.id) {
      bookmarks.splice(i, 1);
    }
  });

  res.send(bookmarks);
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
