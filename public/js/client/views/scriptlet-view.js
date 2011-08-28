
(function(exports) {

    /***
    *
    */
    exports.EditorView = Backbone.View.extend({
        initialize : function() {
            mok.controls.bind('save', this.saveModel.bind(this));
            this.model.bind('change', this.render.bind(this));
        },
        events: {
            "click .newFile": 'newFile'
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
       
        saveModel : function() {
            mok.status.setStatus('Saving');
            this.model.set({src : this.editor.getValue()});
            return this.model.toJSON();
        },
        

        newFile : function() {
            this.trigger('newFile');
        }
    });

    exports.FileView = Backbone.View.extend( {
        initialize : function() {
            this.active = true;
            this.model.bind('change', this.render.bind(this));
        },  
        render : function() {
            var fileName = this.model.get('fileName'); 
            
            if (!this.template) {
                this.template = '{{fileName}}';
                $('.newFile').before('<li class="file active"></li>');
                this.el = $('.newFile').prev();
                this.el.click(this.clicked.bind(this));
            }

            $(this.el).html(Mustache.to_html(this.template, this.model.toJSON()));  
                     
        },

        clicked : function() {
            this.toggleActive();
            this.trigger('updateActive', this); 
        },
 
        toggleActive : function() {
            
            this.el[ ((this.active) ? 'removeClass' : 'addClass' ) ]('active');
            this.active = !this.active;
        }       
    });

    exports.FilesCollectionView = Backbone.View.extend( {
        
        initialize : function() {
            mok.editor.bind('newFile', this.addNew.bind(this));
            this.model.bind('add', this.addModel.bind(this));
            this.activeView = new mok.views.FileView({el : $('.files'), 
                model : this.model.at(0)
            });
            this.activeView.bind('updateActive', this.updateActive.bind(this));
            this.activeView.render();
        },

        addNew : function() {
            this.model.add(new mok.models.Scriptlet({fileName: 'new', src: ''}));
        },

        addModel : function(newModel) {

            var fileView = new mok.views.FileView({el : $('.files'), model : newModel});
            fileView.render();
            fileView.bind('updateActive', this.updateActive.bind(this));
            this.updateActive(fileView);
        },

        updateActive : function(newActive) {
            this.activeView.toggleActive();
            //copy values out of editor, then put values into from new view
            this.activeView.model.set(mok.editor.saveModel());
            this.activeView = newActive;
            mok.activeScriptlet.set(this.activeView.model.toJSON());
        }
        
    });

    exports.initScriptlet = function() {

        var textArea = $('.code-block textarea');
        var serverScriptlet = new mok.models.Scriptlet({fileName : 'server.js', src : textArea[0].value});
        mok.activeScriptlet = new mok.models.Scriptlet(serverScriptlet.toJSON());

        var editor = new mok.views.EditorView({
            model : mok.activeScriptlet ,
            el : $('.code-block')
        });
        editor.setEditor(textArea);
        editor.render();

        mok.editor = editor;

        var filesView = new mok.views.FilesCollectionView({
            model : (new mok.models.FilesCollection([serverScriptlet]))
        });
        
    };

})(mok.views || exports);


