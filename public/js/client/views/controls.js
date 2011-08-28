
(function(exports) {
    exports['Controls'] = Backbone.View.extend({

        events: {
            "click .about":   "about",
            "click .hit": "hit"
        },

        about : function() {
    
        },

        hit : function () {
            var url = '/server/'+mok.who+'/home/';
            window.open(url,'_newtab');       
        }    

    });
})(mok.views || exports);

