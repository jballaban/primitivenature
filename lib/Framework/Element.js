Framework.Element = new JS.Class({ 
	initialize: function() {
		this.layers = []; // layers of sub-elements.  Draw from lower to higher.
		this.elements = {}; // elements within each layer
		this.active = true; // if this element should perform updates
		this.parent = null; // the elements parent
		this.show = true; // if the element should be draw (doesn't determine if within viewport)
		this.x = 0; // the un-calculated x position (could be offset or absolute)
		this.y = 0; // the un-calculated y position (could be offset or absolute)
		this.calculatedX = 0; // the calculated x position (done on each update)
		this.calculatedY = 0; // the calculated y position (done on each update)
		this.width = 0; // element width
		this.Mouse = null; // Mouse cursor when hovering, null means go to parent
		this.height = 0; // element height
		this.vPosition = 'absolute'; // vertical: relative, absolute or centered to determine calculatedX
		this.hPosition = 'absolute'; // horizontal: relative, absolute or centered to determine calculatedX
		this.sprite = new Framework.Sprite(); // image or colour to draw
		this.hovered = false; // true if mouse is over the element
	},
	calcX : function() {
		if (this.hPosition == 'absolute')
			return this.x;
		else if (this.hPosition == 'centered') {
			if (this.width == 0) {
				console.log('ERROR: Cannot have horizontal centered element with 0 width', this);
				return;
			} else if (this.parent == null) {
				console.log('ERROR: Cannot have horizontal centered element with no parent to center against', this);
				return;
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
				console.log('ERROR: Cannot have vertical centered element with no parent to center against', this);
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
		return Framework.Math.intersects(x, y, this.calculatedX, this.calculatedY, this.width, this.height);
	},
	/// Note this method assumes all children existing with parent (x,y)-(x+w,y+h) boundaries
	/// This is also used by the mouse 
	elementAt: function (x, y) { // return top element at coords or null if none
		var layer = 0;
		for (var layeri = this.layers.length-1; layeri >= 0; layeri--) {
			var layer = this.layers[layeri];
			for (var element = 0; element < this.elements[layer].length; element++) {
				var el = this.elements[layer][element];
				if (!el.intersects(x,y))
					continue;
				var child = el.elementAt(x,y);
				return child == null ? el : child;
			}
		}
		return null;
	},
	getMouse : function() {
		if (this.Mouse != null)
			return this.Mouse;
		return this.parent.getMouse();
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

			for (var i=0;i<this.layers.length;i++) {
				for (var j=0;j<this.elements[this.layers[i]].length;j++) {
					this.elements[this.layers[i]][j].update();
				}
			}
		}
	},
	draw : function() {
		if (this.show) {
			
			this.sprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
			for (var i=0;i<this.layers.length;i++) {
				for (var j=0;j<this.elements[this.layers[i]].length;j++) {
					this.elements[this.layers[i]][j].draw();
				}
			}
		}
	},
	addLayer : function(layer) {
		if (this.layers.indexOf(layer) > -1) {
			console.log('ERROR: Tried to add layer '+layer+' but it already exists', this.layers);
			return;
		}
		this.elements[layer] = [];
		this.layers.push(layer);
	},
	addElement : function(layer, element) {
		if (this.layers.indexOf(layer) == -1) {
			console.log('ERROR: Tried to element to non-existent layer '+layer, element, this.layers);
			return;
		}
		this.elements[layer].push(element);
		element.parent = this; // double link
	},
	getElements : function(layer) {
		if (this.layers.indexOf(layer) == -1) {
			console.log('ERROR: Tried to get elements for non-existent layer '+layer, this.layers);
			return;
		}
		return this.elements[layer];
	},
});