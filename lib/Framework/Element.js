Framework.Element = new JS.Class({ 
	initialize: function() {
		this.layers = [];
		this.elements = {};
		this.active = true;
		this.parent = null;
		this.show = true;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.vPosition = 'absolute';
		this.hPosition = 'absolute';
		this.sprite = new Framework.Sprite();
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
			return this.parent.calcX() + (this.parent.width / 2) - (this.width / 2);
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
			return this.parent.calcY() + (this.parent.height / 2) - (this.height / 2);
		} else if (this.vPosition == 'relative') {
			return this.parent.calcY() + this.y;
		} else {
			console.log('ERROR: Unknown vPosition '+this.vPosition, this);
		}
	},
	draw : function() {
		if (this.active && this.show) {
			this.sprite.draw(this.calcX(), this.calcY(), this.width, this.height);
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