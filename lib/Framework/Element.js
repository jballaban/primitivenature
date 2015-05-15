"use strict";
Global.loader.load(['lib/Framework/Framework.js', 'lib/Framework/Sprite.js'], function() {
	class Element {
		constructor (options) {
			options = options || {};
			this.elements = options.elements || [];
			this.active = options.active || true;
			this.parent = options.parent || null;
			this.show = options.show || true;
			this.x = options.x || 0;
			this.y = options.y || 0;
			this.width = options.width || 0;
			this.height = options.height || 0;
			this.vPosition = options.vPosition || 'absolute';
			this.hPosition = options.hPosition || 'absolute';
			this.sprite = options.sprite || null;
			this.hovered = false;
			this.calculatedX = 0;
			this.calculatedY = 0;
		}

		_calc(width) {
			let relativelabel = width ? 'hPosition' : 'vPosition';
			let dimensionlabel = width ? 'width' : 'height';
			let windowdimensionlabel = width ? 'innerWidth' : 'innerHeight';
			let positionlabel = width ? 'x' : 'y';
			let parentpositionlabel = width ? 'calculatedX' : 'calculatedY';

			if (this[relativelabel] == 'absolute')
				return this[positionlabel];
			else if (this[relativelabel] == 'centered') {
				if (this[dimensionlabel] == 0) {
					console.log('ERROR: Cannot have centered element with 0 dimension');
					debugger;
				} else if (this.parent == null) {
					return (window[windowdimensionlabel] / 2) - (this[dimensionlabel] / 2) + this[positionlabel];
				} else if (this[positionlabel] > 0) {
					console.log('WARNING: Centered element with a position value');
					debugger;
				}
				return this.parent[parentpositionlabel] + (this.parent[dimensionlabel] / 2) - (this[dimensionlabel]/ 2) + this[positionlabel];
			} else if (this[relativelabel] == 'relative') {
				return this.parent[parentpositionlabel] + this[positionlabel];
			} else {
				console.log('ERROR: Unknown relative value');
				debugger;
			}
		}

		reposition() {
			this.calculatedX = this._calc(true);
			this.calculatedY = this._calc(false);
			for (let i=0;i<this.elements.length;i++)
				this.elements[i].reposition();
		}

		addElement(element) {
			this.elements.push(element);
			element.parent = this; // double link
			return element;
		}

		update() {
			if (this.active) {
				if (this.sprite != null)
					this.sprite.update();
				for (let i=0;i<this.elements.length;i++) {
					this.elements[i].update();
				}
			}
		}

		draw() {
			if (this.show) {
				if (this.sprite != null)
					this.sprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
				for (var i=0;i<this.elements.length;i++) {
					this.elements[i].draw();
				}
			}
		}

	}
	Framework.Element = Element;
	Global.loader.loaded('lib/Framework/Element.js');
});

/*
Framework.Element = new JS.Class({ 

	
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
	
	
});
*/