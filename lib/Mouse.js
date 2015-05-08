Framework.MouseStates = {
	Pointing: {
		initState: function() {
			this.element = Framework.Cursors.Pointer;
			this.element.x = this.x;
			this.element.y = this.y;
		},
		mouseMove: function(e) {
			this.element.x = this.x = e.clientX;
			this.element.y = this.y = e.clientY;
		},
		draw: function() {
			this.element.draw();
		}
	},
	Clicking: {
		initState: function() {
			this.element = Framework.Cursors.Clicker;
			this.element.x = this.x;
			this.element.y = this.y;
		},
		mouseMove: function(e) {
			if (Math.abs(this.x - e.clientX) > 10 || Math.abs(this.y - e.clientY) > 10) {
				Framework.Mouse.setState(Framework.MouseStates.Selecting);
			}
		},
		mouseUp : function(e) {
			Framework.Mouse.setState(Framework.MouseStates.Pointing);
		},
		draw: function() {
			this.element.draw();
		}
	},
	Selecting: {
		initState: function() {
			this.element = Framework.Cursors.Selector;
			this.element.x = this.x;
			this.element.y = this.y;
		},
		mouseMove: function(e) {
			this.element.x = e.clientX;
			this.element.y = e.clientY;
			this.width = e.clientX - this.x;
			this.height = e.clientY - this.y;
		},
		mouseUp: function(e) {
			Framework.Mouse.setState(Framework.MouseStates.Pointing);
		},
		draw: function() {
			Runtime.Canvas.globalAlpha = 0.2;
			Runtime.Canvas.fillStyle = '#fff';
			Runtime.Canvas.fillRect(this.x,this.y,this.width,this.height);
			Runtime.Canvas.globalAlpha = 1;
			this.element.draw();
		}
	}
};

Framework.Cursors = {}

Framework.Cursors.Pointer = new JS.Singleton(Framework.Element, {
	initialize: function() {
		this.callSuper();
		this.width = 26;
		this.height = 26;
		this.sprite = new Framework.Sprite(['asset/cursor.png'])
	}
});

Framework.Cursors.Clicker = new JS.Singleton(Framework.Element, {
	initialize: function() {
		this.callSuper();
		this.width = 32;
		this.height = 32;
		this.colour = '#0F0';
	}
});

Framework.Cursors.Selector = new JS.Singleton(Framework.Element, {
	initialize: function() {
		this.callSuper();
		this.width = 32;
		this.height = 32;
		this.colour = '#F00';
	}
});

Framework.Mouse = new JS.Class({extends:Element}, {
	up : function() {

	},
	down : function() {

	},
	move : function() {

	}
});

Framework.MouseHandler = new JS.Singleton({
	initialize: function() {
		this.x = 0;
		this.y = 0;
		this.focus = null; // focused Framework.Element
		$(document).bind('mousedown', function(e) { Framework.MouseHandler.mouseDown(e); });
		$(document).bind('mousemove', function(e) { Framework.MouseHandler.mouseMove(e); });
		$(document).bind('mouseup', function(e) { Framework.MouseHandler.mouseUp(e); });
	},
	update: function(screen) { // current Framework.Screen
		if (this.focus != null)
			this.focus.mouseOut();
		this.focus = screen.elementAt(this.x, this.y);
		if (this.focus != null)
			this.focus.mouseOver();
	},
	draw: function() {
		if (this.focus != null && this.focus.Mouse != null)
			this.focus.Mouse.draw();
	},
	mouseUp: function(e) {
		if (this.focus != null && this.focus.Mouse != null)
			this.focus.Mouse.up();
	},
	mouseMove: function(e) {
		this.x = e.clientX;
		this.y = e.clientY;
		if (this.focus != null && this.focus.Mouse != null)
			this.focus.Mouse.move(e.clientX, e.clientY);
	},
	mouseDown: function(e) {
		e.preventDefault();
		if (this.focus != null)
			this.focus.Mouse.down();
		//this.x = e.clientX;
		//this.y = e.clientY;
		//this.height = 1;
		//this.width = 1;
		//Framework.Mouse.setState(Framework.MouseStates.Clicking);
	}
});