Framework.Screen = new JS.Class(Framework.Element, {
	initialize: function() {
		this.callSuper({ width: window.innerWidth, height: window.innerHeight });
		this.mouse = new Framework.Mouse(Framework.Cursors.Invisible);
	},
	draw: function() {
		Runtime.Canvas.clearRect(0, 0, this.width, this.height);
		this.callSuper();
	}
});