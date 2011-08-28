
(function(exports) {
	

    exports.StatusView = Backbone.View.extend({
        initialize : function() {
            this.model.bind('change', this.render.bind(this));
        },          

        render : function() {
            this.el[0].innerHTML = this.model.get('status');
            if (this.animating) return;
            this.animating = true;
            this.el.fadeIn(400).delay(1000).fadeOut(400, function() {
                this.animating = false;
            }.bind(this));
        }
        
    });


})(mok.views || exports);
