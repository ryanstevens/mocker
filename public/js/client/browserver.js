
//default namespace
var mok = {
    who : uuid(),
    models : {},
    views : {},
    scriptlets : {}
};


mok.Responder = function(reqId) {
    
    _.extend(this, Backbone.Events);
    
    this.end = function() {
        mok.socket.emit('res.end.'+reqId);
        this.trigger('end');
    };

    this.write = function(data) {
        
        mok.socket.emit('res.write.'+reqId, {data : data});

    };
};


function init() {

    mok.createNewScriptlet();
    
    mok.socket = io.connect('/');
    mok.socket.on('challenge', function() {
        mok.socket.emit('challenge-response', mok.who);
    });

    mok.socket.on('fetch', function(request) {
        console.log(request);
        
        var response = new mok.Responder(request.reqId);
        mok.scriptlets.handleResponse(request, response);
        
    });

    var controls = new mok.views.Controls({
        el : $('.links')
    });

    mok.status = new mok.models.Status({status : '', gen : 0});
    var statusView = new mok.views.StatusView({
        el : $('.header .status'),
        model : mok.status
    });
}   

