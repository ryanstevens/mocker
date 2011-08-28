
//default namespace
var mok = {
    who : uuid(),
    models : {},
    views : {},
    scriptlets : {}
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
        
        mok.scriptlets.handleResponse(request, new mok.Responder(request));
        
    });


    mok.status = new mok.models.Status({status : '', gen : 0});
    var statusView = new mok.views.StatusView({
        el : $('.header .status'),
        model : mok.status
    });
}   

