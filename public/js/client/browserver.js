//default namespace
var mok = {
    who : uuid()
};

function init() {
    var editor = CodeMirror.fromTextArea($('.code-block textarea')[0], {
        lineNumbers: true,
        matchBrackets: true
    });
    
    mok.socket = io.connect('/');
  
    mok.socket.on('challenge', function() {
        mok.socket.emit('challenge-response', mok.who);
    });

    mok.socket.on('fetch', function(req) {
        console.log(req);
    });
}

