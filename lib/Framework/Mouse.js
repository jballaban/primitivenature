"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	class MouseHandler extends Framework.Element {
		constructor() {
			this.x = 0;
			this.y = 0;
			this.focus = null; // focused Framework.Element
			this.mouse = null;
			this.needsLock = true;
			
			$(document).bind('mousedown', function(e) { 
				if(!this.needsLock) Framework.MouseHandler.mouseDown(e); 
			}.bind(this));
			
			$(document).bind('mousemove', function(e) { 
				Framework.MouseHandler.mouseMove(e); 
			});

			$(document).bind('mouseup', function(e) { 
				if(this.needsLock) $('body')[0].requestPointerLock(); 
				else Framework.MouseHandler.mouseUp(e); 
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
		}
	}
	Framework.MouseHandler = MouseHandler;
	Global.loader.loaded('lib/Framework/MouseHandler.js');
});
/*
Framework.MouseHandler = new JS.Singleton({
	initialize: function() {
		
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

*/