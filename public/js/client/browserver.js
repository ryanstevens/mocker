
//default namespace
var mok = {
    who : uuid(),
    models : {},
    views : {},
    scriptlets : {},
    sandbox : {}
};


mok.Responder = function(request) {
    
    _.extend(this, Backbone.Events);
    
    this.end = function() {
        mok.socket.emit('res.end.'+request.reqId);
        this.trigger('end');
    };

    this.write = function(data) {
        
        mok.socket.emit('res.write.'+request.reqId, {data : data});

    };
};

function require(script) {
    return mok.scriptlets[script.replace('.', '_').replace('_', '')];
}

function init() {
    
    mok.controls = new mok.views.Controls({
        el : $('.links')
    });

    mok.views.initScriptlet();
    
    mok.socket = io.connect('/');
    mok.socket.on('challenge', function() {
        mok.socket.emit('challenge-response', mok.who);
    });

    mok.socket.on('fetch', function(request) {
        console.log(request);
        
        var responder = new mok.Responder(request);
        try {
            require('server.js').handleResponse(request,responder);
        }
        catch(e) {
            responder.write('error-- '+e.message);
            responder.end();
        }
        
    });


    mok.status = new mok.models.Status({status : '', gen : 0});
    var statusView = new mok.views.StatusView({
        el : $('.header .status'),
        model : mok.status
    });
}   

