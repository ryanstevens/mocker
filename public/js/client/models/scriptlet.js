
(function(exports) {
    var execer = function(src) {
        try {
            eval(src);
        } catch(e) {

        }

    };
    exports.Scriptlet = Backbone.Model.extend( {
        
        initialize : function() {
            this.bind('change', this.loadNS.bind(this));
            this.loadNS();
        },  
        getCode : function() {
            return this.get('src');
        },
        loadNS : function() {
            
            var file = this.get('fileName').replace('.', '_').replace('_', '');
            execer("mok.scriptlets['"+file+"']={}");
            
            var script = [
                    '(function(exports) { ',
                    this.getCode(),
                    " })(mok.scriptlets['"+file+"'])"];
            execer(script.join('\n'));

        }

    });


    exports.FilesCollection = Backbone.Collection.extend({
        model : exports.Scriptlet
    });


})(mok.models || exports);
