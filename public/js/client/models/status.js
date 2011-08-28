
(function(exports) {
    exports.Status = Backbone.Model.extend( {
        
        setStatus : function(status){
            this.set({status : status, gen : this.get('gen')+1});
        }

    }); 
})(mok.models || exports);
