Framework.Screen = new JS.Class(Framework.Element, {
	initialize : function() {
		this.callSuper();
		this.Mouse = new Framework.Mouse(Framework.Cursors.Pointer);
	},
	elementAt: function() {
		var el = this.callSuper();
		return el == null ? this : el;
	}
});