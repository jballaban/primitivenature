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

Framework.Cursors.Invisible = new JS.Singleton(Framework.Element, {
	initialize: function() {
		this.callSuper();
		this.width = 1;
		this.height = 1;
	}
});

Framework.Cursors.Pointer = new JS.Singleton(Framework.Element, {
	initialize: function() {
		this.callSuper();
		this.width = 26;
		this.height = 26;
		this.sprite = new Framework.Sprite.Image({ src: 'asset/cursor.png' });
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

Framework.Mouse = new JS.Class({
	initialize: function(element) {
		this.x = 0;
		this.y = 0;
		this.leftButtonPressed = false;
		if (element == null)
			console.log('ERROR: Must supply element to mouse')
		this.element = element;
	},
	up : function() {
		this.leftButtonPressed = false;
		if (Framework.MouseHandler.focus != null)
			Framework.MouseHandler.focus.mouseClick();
	},
	down : function() {
		this.leftButtonPressed = true;
	},
	move : function(x, y) {
		this.x = x;
		this.y = y;
	},
	update : function() {
		this.element.x = this.x;
		this.element.y = this.y;
		this.element.update();
	},
	draw : function() {
		this.element.draw();
	}
});

Framework.MouseHandler = new JS.Singleton({
	initialize: function() {
		this.x = 0;
		this.y = 0;
		this.focus = null; // focused Framework.Element
		this.mouse = null;
		this.needsLock = true;
		$(document).bind('mousedown', function(e) {
			if(!this.needsLock)
				Framework.MouseHandler.mouseDown(e);
		}.bind(this));
		$(document).bind('mousemove', function(e) { Framework.MouseHandler.mouseMove(e); });
		$(document).bind('mouseup', function(e) {
			if(this.needsLock){
				$('body')[0].requestPointerLock();
			}else{
				Framework.MouseHandler.mouseUp(e);
			}
		}.bind(this));
		$(document).bind('pointerlockchange', function(){
			this.needsLock = (document.pointerLockElement === null);
			$(window).triggerHandler('resize');
		}.bind(this));

		$(window).bind('resize',function(){
			if(!this.needsLock){
				this.clientAreaWidth = document.pointerLockElement.offsetWidth;
				this.clientAreaHeight = document.pointerLockElement.offsetHeight;
			}
		}.bind(this)).triggerHandler('resize');
	},
	reset: function(mouse) { // resets with the given mouse
		this.focus = null;
		this.mouse = mouse;
	},
	update: function(screen) { // current Framework.Screen
		var newfocus = screen.elementAt(this.x, this.y);
		if (newfocus != this.focus) {
			if (this.focus != null)
				this.focus.mouseOut();
			this.focus = newfocus;
			if (this.focus != null) {
				this.focus.mouseOver();
				this.mouse = this.focus.getMouse();
				if (this.mouse != null)
					this.mouse.move(this.x, this.y);
			}
		}
		if (this.mouse != null)
			this.mouse.update();
	},
	draw: function() {
		if (this.mouse != null)
			this.mouse.draw();
	},
	mouseUp: function(e) {
		if (this.mouse != null)
			this.mouse.up();
	},
	mouseMove: function(e) {
		if(this.needsLock){
			this.x = e.clientX;
			this.y = e.clientY;
		}
		else{
			this.x += e.originalEvent.movementX;
			this.y += e.originalEvent.movementY;
			if(this.x < 0){
				this.x = 0;
			}else if(this.x >= this.clientAreaWidth){
				this.x = this.clientAreaWidth-1;
			}
			if(this.y < 0){
				this.y = 0;
			}else if(this.y >= this.clientAreaHeight){
				this.y = this.clientAreaHeight-1;
			}
		}
		if (this.mouse != null)
			this.mouse.move(this.x, this.y);
	},
	mouseDown: function(e) {
		e.preventDefault();
		if (this.mouse != null)
			this.mouse.down();
		//this.x = e.clientX;
		//this.y = e.clientY;
		//this.height = 1;
		//this.width = 1;
		//Framework.Mouse.setState(Framework.MouseStates.Clicking);
	}
});
