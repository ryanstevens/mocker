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


var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

console.log('Listening on ' + app.address().port);
