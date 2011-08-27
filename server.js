var http = require('http') 
    , nko = require('nko')('zYF4TnFYVYG9ggWG')
    , express = require('express')
    , mocker = require('./lib/Mocker.js');




var app = express.createServer();
app.set('view engine', 'jade');
app.set('log level', 1);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.render('index.jade');
});

app.get('/server/:uuid/*', function(req, res) {
    console.log(req.params.uuid);
    mocker.handleResponse(req, res, req.params.uuid);
});
app.listen(parseInt(process.env.PORT) || 7777);


var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
  
    mocker.registerClient(socket, app);
    
});
console.log('Listening on ' + app.address().port);
