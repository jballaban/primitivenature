"use strict";
Global.loader.load(['lib/Framework/Framework.js'], function() {
	class Element {
		
	}
	Framework.Element = Element;
	Global.loader.loaded('lib/Framework/Element.js');
});

/*
Framework.Element = new JS.Class({ 
	initialize: function(options) {
		this.elements = []; // child-elements
		this.active = true; // if this element should perform updates
		this.parent = null; // the elements parent
		this.show = true; // if the element should be draw (doesn't determine if within viewport)
		this.x = 0; // the un-calculated x position (could be offset or absolute)
		this.y = 0; // the un-calculated y position (could be offset or absolute)
		this.calculatedX = 0; // the calculated x position (done on each update)
		this.calculatedY = 0; // the calculated y position (done on each update)
		this.width = null; // element width (null uses parent)
		this.mouse = null; // Mouse cursor when hovering, null means go to parent
		this.height = null; // element height (null uses parent)
		this.vPosition = 'absolute'; // vertical: relative, absolute or centered to determine calculatedX
		this.hPosition = 'absolute'; // horizontal: relative, absolute or centered to determine calculatedX
		this.sprite = null // optional sprite to draw for this element
		this.hovered = false; // true if mouse is over the element
		$.extend(this, options);
	},
	calcX : function() {
		if (this.hPosition == 'absolute')
			return this.x;
		else if (this.hPosition == 'centered') {
			if (this.width == 0) {
				console.log('ERROR: Cannot have horizontal centered element with 0 width', this);
				return;
			} else if (this.parent == null) {
				return (window.innerWidth / 2) - (this.width / 2) + this.x;
			} else if (this.x > 0) {
				console.log('WARNING: Centered element with an X value found', this);
			}
			return this.parent.calcX() + (this.parent.width / 2) - (this.width / 2) + this.x;
		} else if (this.hPosition == 'relative') {
			return this.parent.calcX() + this.x;
		} else {
			console.log('ERROR: Unknown hPosition '+this.hPosition, this);
		}
	},
	calcY : function() {
		if (this.vPosition == 'absolute')
			return this.y
		else if (this.vPosition == 'centered') {
			if (this.height == 0) {
				console.log('ERROR: Cannot have vertical centered element with 0 height', this);
				return;
			} else if (this.parent == null) {
				return (window.innerHeight / 2) - (this.height / 2) + this.y;
				return;
			} else if (this.y > 0) {
				console.log('WARNING: Centered element with an Y value found', this);
			}
			return this.parent.calcY() + (this.parent.height / 2) - (this.height / 2) + this.y;
		} else if (this.vPosition == 'relative') {
			return this.parent.calcY() + this.y;
		} else {
			console.log('ERROR: Unknown vPosition '+this.vPosition, this);
		}
	},
	intersects: function(x, y) { // true if points intercept this element
		return Framework.Math.intersects(x, y, this.calculatedX, this.calculatedY, this.getWidth(), this.getHeight());
	},
	/// Note this method assumes all children existing with parent (x,y)-(x+w,y+h) boundaries
	/// This is also used by the mouse 
	elementAt: function (x, y) { // return top element at coords or null if none
		var i = 0;
		for (var i=this.elements.length-1;i>=0;i--) {
			var el = this.elements[i];
			if (!el.intersects(x,y)) // assumes all children fit within parent boundary
				continue;
			var child = el.elementAt(x,y);
			return child == null ? el : child;
		}
		return null;
	},
	getWidth: function() {
		return this.width || this.parent.getWidth();
	},
	getHeight: function() {
		return this.height || this.parent.getHeight();
	},
	getMouse : function() {
		if (this.mouse != null)
			return this.mouse;
		if (this.parent != null)
			return this.parent.getMouse();
		return null;
	},
	mouseOut: function() { // triggered when mouse leaves this element
		this.hovered = false;
	},
	mouseOver: function() { // when mouse is hovering over this element
		this.hovered = true;
	},
	mouseClick: function() { // when mouseup releases on this element
		
	},
	update : function() {
		this.calculatedX = this.calcX();
		this.calculatedY = this.calcY();
		if (this.active) {
			if (this.sprite != null)
				this.sprite.update();
			for (var i=0;i<this.elements.length;i++) {
				this.elements[i].update();
			}
		}
	},
	draw : function() {
		if (this.show) {
			if (this.sprite != null)
				this.sprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
			for (var i=0;i<this.elements.length;i++) {
				this.elements[i].draw();
			}
		}
	},
	addElement : function(element) {
		this.elements.push(element);
		element.parent = this; // double link
	}
});
*/