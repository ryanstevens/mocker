

(function(exports) {

    var reqId = 0;
    var clientServers = {
        clients : {},
        sessionMap : {},
        addClient : function(uuid, socket) {
            this.clients[uuid] = socket;
            this.sessionMap[socket.id] = uuid;
        },
        getClient : function(uuid) {
            return this.clients[uuid];
        }   
    };

    exports.handleResponse = function(req, res, uuid) {
        var socket = clientServers.getClient(uuid);
        if (!socket) {
            res.render('404.jade');
            console.log('socket not found for '+uuid);
            return;
        }

        socket.on('res.write.'+reqId, function(data) {
            res.write(data.data);
        });

        socket.on('res.end.'+reqId, function(data) {
            res.end();
        });

        socket.emit('fetch', {
            reqId: reqId++,
            host : req.headers['host'],
            port : req.port,
            method : req.method,
            path : req.url,
            headers : req.headers
        });

    };

    exports.registerClient = function(socket, app) {
        
        socket.emit('challenge');
        socket.on('challenge-response', function(uuid) {
            clientServers.addClient(uuid, socket);
        });

    }; 

})(exports);

