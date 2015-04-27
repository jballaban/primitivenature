Framework.Menu = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		$.extend(this,options);
		this.sprite.colour = '#000';
		this.sprite.alpha = 0.5;
	}
});