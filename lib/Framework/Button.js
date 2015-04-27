Framework.Button = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		this.hovercolour = null;
		this.text = null;
		$.extend(this, options);
	},
	update: function() {
		if (this.hovercolour != null) {
			this.sprite.colour = this.hovered ? this.hovercolour : this.colour;
		}
		this.callSuper();
	},
	draw: function() {
		this.callSuper();
		if (this.text != null)
			this.text.draw(this.calculatedX+5, this.calculatedY+5+this.height/2, this.width-10);
	}
});