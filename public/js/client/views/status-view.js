
(function(exports) {
	

    exports.StatusView = Backbone.View.extend({
        initialize : function() {
            this.model.bind('change', this.render.bind(this));
        },          

        render : function() {
            this.el[0].innerHTML = this.model.get('status');
            this.el.fadeIn(400).delay(1000).fadeOut(400);
        }
        
    });


})(mok.views || exports);
