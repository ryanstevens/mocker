
(function(exports) {
    exports.Scriptlet = Backbone.Model.extend( {
        
        initialize : function() {
            this.bind('change', this.loadNS.bind(this));
            this.loadNS();
        },  
        getCode : function() {
            return this.get('src');
        },
        loadNS : function() {
            
            var srcipt = ['(function(exports) { ',
                    this.getCode(),
                    ' })(mok.scriptlets)'];
            try {
                eval('('+srcipt.join('\n')+')');
            }
            catch(e) {
                this.trigger('evalError', e);
            }

        }

    }); 


    exports.FilesCollection = Backbone.Collection.extend({
        model : exports.Scriptlet
    });


})(mok.models || exports);
