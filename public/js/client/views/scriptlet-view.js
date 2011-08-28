
(function(exports) {

    exports.ScriptletView = Backbone.View.extend({
    

        render : function() {

            if (!this.editor) {
                this.editor = CodeMirror(this.el[0], {
                    value : this.model.getCode(),
                    lineNumbers: true,
                    matchBrackets: true
                });
            }
        }
    });



})(mok.views || exports);

mok.createNewScriptlet = function(src) {
    
    var scriptlet = new mok.models.Scriptlet({src : src});

    var view = new mok.views.ScriptletView({
        model : scriptlet,
        el : $('.code-block') 
    });

    view.render();

    return view;

};


