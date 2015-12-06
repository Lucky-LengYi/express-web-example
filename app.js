var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('.html', ejs.__express);
app.use(express.static('public'));
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index');
});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
