"use strict";
Global.loader.load(['lib/Framework/Framework.js', 'lib/Framework/Sprite.js', 'lib/Framework/Math.js'], function() {
	Framework.Element = (function() {
		class Element {
			constructor (options) {
				options = options || {};
				this.elements = options.elements == null ? [] : options.elements;
				this.active = options.active == null ? true : options.active;
				this.parent = options.parent;
				this.show = options.show == null ? true : options.show;
				this.x = options.x == null ? 0 : options.x;
				this.y = options.y == null ? 0 : options.y;
				this.width = options.width == null ? 0 : options.width;
				this.height = options.height == null ? 0 : options.height;
				this.vPosition = options.vPosition || 'absolute';
				this.hPosition = options.hPosition || 'absolute';
				this.sprite = options.sprite
				this.hovered = false;
				this.calculatedX = 0;
				this.calculatedY = 0;
				this.alpha = options.alpha == null ? 1 : options.alpha;
				this.mouse = options.mouse;
			}

			get alpha() {
				return this._alpha;
			}

			set alpha(value) {
				this._alpha = Math.min(1, value);
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

			draw(a) {
				if (a == null) {
					console.log('Element.draw called without alpha')
					debugger;
				}
				if (this.show) {
					if (this.sprite != null)
						this.sprite.draw(this.calculatedX, this.calculatedY, this.width, this.height, this.alpha*a);
					for (var i=0;i<this.elements.length;i++) {
						this.elements[i].draw(this.alpha*a);
					}
				}
			}

			intersects(x, y) { // true if points intercept this element
				return Framework.Math.intersects(x, y, this.calculatedX, this.calculatedY, this.getWidth(), this.getHeight());
			}

			getWidth() {
				return this.width || this.parent.getWidth();
			}

			getHeight() {
				return this.height || this.parent.getHeight();
			}

			elementAt(x, y) { // return top element at coords or null if none
				if (!this.intersects(x,y))
					return null;
				var i = 0;
				for (var i=this.elements.length-1;i>=0;i--) {
					var el = this.elements[i].elementAt(x,y);
					if (el != null) return el;
				}
				return this;
			}
			
			getMouse() {
				if (this.mouse != null)
					return this.mouse;
				if (this.parent != null)
					return this.parent.getMouse();
				return null;
			}

			mouseOut() { // triggered when mouse leaves this element
				this.hovered = false;
			}
			
			mouseOver() { // when mouse is hovering over this element
				this.hovered = true;
			}
			
			mouseClick() { // when mouseup releases on this element
			}
		}
		return Element;
	})();
});

/*
Framework.Element = new JS.Class({ 

	
	,
	/// Note this method assumes all children existing with parent (x,y)-(x+w,y+h) boundaries
	/// This is also used by the mouse 
	
	
	
});
*/