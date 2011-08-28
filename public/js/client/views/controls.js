
(function(exports) {
    exports['Controls'] = Backbone.View.extend({

        events: {
            "click .about": "about",
            "click .hit": "hit",
            "click .save": "save"
        },

        about : function() {
            alert('This was build for the node knock out.  Click "View It" to see your browser serve a response stream');
        },

        hit : function () {
            //first, save your work
            mok.editor.saveModel();
            
            if (mok.status)
                mok.status.setStatus('Opening URL');
            var url = '/server/'+mok.who+'/home/';
            window.open(url,'_newtab');       
        },

        save : function() {
            this.trigger('save');
        }   

    });
})(mok.views || exports);

