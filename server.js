var http = require('http') 
    , nko = require('nko')('zYF4TnFYVYG9ggWG')
    , express = require('express');




var app = express.createServer();
app.set('view engine', 'jade');
app.set('log level', 1);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.render('index.jade', { pageTitle: 'BrowServer' });
});

app.listen(parseInt(process.env.PORT) || 7777);


console.log('Listening on ' + app.address().port);
