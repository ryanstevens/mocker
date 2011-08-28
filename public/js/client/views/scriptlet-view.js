
(function(exports) {

    exports.ScriptletView = Backbone.View.extend({
    

        render : function() {

            if (!this.editor) {
                this.el[0].value = '';
                this.editor = CodeMirror.fromTextArea(this.el[0], {//this.el[0], {
                    lineNumbers: true,
                    matchBrackets: true
                });
            }
            this.editor.setValue(this.model.get('src'));
        }
    });



})(mok.views || exports);

mok.createNewScriptlet = function(src) {
    
    var scriptlet = new mok.models.Scriptlet({src : src});

    var view = new mok.views.ScriptletView({
        model : scriptlet,
        el :$('.code-block textarea')
   });

    view.render();

    return view;

};


