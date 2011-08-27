var http = require('http') 
, nko = require('nko')('zYF4TnFYVYG9ggWG');

var app = http.createServer(function (req, res) { 
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    res.end('Hello, my name is HAL'); 
});

app.listen(parseInt(process.env.PORT) || 7777); 
console.log('Listening on ' + app.address().port);
