
(function(exports) {

    exports.ScriptletView = Backbone.View.extend({
        initialize : function() {
            mok.controls.bind('save', this.save.bind(this));
        },
        events: {
            "click .save":   "save"
        },

        render : function() {

            this.el[0].value = '';
            this.editor.setValue(this.model.get('src'));

        },

        setEditor : function(textArea) {
            this.textArea = textArea;
            this.editor = CodeMirror.fromTextArea(this.textArea[0], {                   
                    lineNumbers: true,
                    matchBrackets: true
            });
        },
        
        save : function() {
            mok.status.setStatus('Saving');
            this.model.set({src : this.editor.getValue()});
        }
    });

    exports.FileView = Backbone.View.extend( {

    });

    exports.FilesView = Backbone.View.extend( {

        
    });

    exports.initScriptlet = function() {

        var textArea = $('.code-block textarea');
        mok.activeScriptlet = new mok.models.Scriptlet({src : textArea[0].value});

        var view = new mok.views.ScriptletView({
            model : mok.activeScriptlet ,
            el : $('.code-block')
        });
        view.setEditor(textArea);
        view.render();

        mok.scriptletView = view;

        var files = new mok.models.FilesCollection({});
        files.add(mok.activeScriptlet);
        
    };

})(mok.views || exports);


