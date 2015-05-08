Framework.Menu = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		this.mouse = new Framework.Mouse(Framework.Cursors.Pointer);
		this.sprite = new Framework.Sprite.Rectangle({colour:'#000', alpha:0.5});
	}
});