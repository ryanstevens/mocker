
(function(exports) {

    exports.ScriptletView = Backbone.View.extend({
    
        events: {
            "click .save":   "save"
        },

        render : function() {

            this.el[0].value = '';
            if (!this.editor) {
                this.editor = CodeMirror.fromTextArea($('.code-block textarea')[0], {                   
                    lineNumbers: true,
                    matchBrackets: true
                });
            }
            this.editor.setValue(this.model.get('src'));

        },
        
        save : function() {
            this.model.set({src : this.editor.getValue()});
        }
    });



})(mok.views || exports);

mok.createNewScriptlet = function() {
    
    var scriptlet = new mok.models.Scriptlet({src : $('.code-block textarea')[0].value});

    var view = new mok.views.ScriptletView({
        model : scriptlet,
        el : $('.code-block')
    });

    view.render();

    return view;

};


