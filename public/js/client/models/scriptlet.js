
(function(exports) {
    var execer = function(src) {
        eval('('+src+')');
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
       
            var runInNS = function(code, namespace) {
                try {
                  execer(namespace+"={}");
            
                  var script = [
                    '(function(exports) { ',
                    code,
                    " })("+namespace+")"];
                  execer(script.join('\n'));
                }
                catch(e) {
                  alert("There is a problem with your code\n"+e.message);
                  return false;  
                }
                return true;
            };  
        
            if (runInNS(this.getCode(), "mok.sandbox"))
                runInNS(this.getCode(), "mok.scriptlets['"+file+"']");
           
        }

    });


    exports.FilesCollection = Backbone.Collection.extend({
        model : exports.Scriptlet
    });


})(mok.models || exports);
