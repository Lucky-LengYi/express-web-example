var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var bookmarks = require('./bookmarks.json');

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

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
