Framework.Sprite =  {};

Framework.Sprite.Rectangle = new JS.Class({
	initialize: function(options) {
		this.colour = '#000';
		this.alpha = 1;
		this.radius = 5;
		this.fill = true;
		$.extend(this, options);
	},
	update: function() {

	},
	draw: function(x, y, w, h) {
		Runtime.Canvas.globalAlpha = this.alpha;
		
		Runtime.Canvas.beginPath();
		Runtime.Canvas.moveTo(x + this.radius, y);
		Runtime.Canvas.lineTo(x + w - this.radius, y);
		Runtime.Canvas.quadraticCurveTo(x + w, y, x + w, y + this.radius);
		Runtime.Canvas.lineTo(x + w, y + h - this.radius);
		Runtime.Canvas.quadraticCurveTo(x + w, y + h, x + w - this.radius, y + h);
		Runtime.Canvas.lineTo(x + this.radius, y + h);
		Runtime.Canvas.quadraticCurveTo(x, y + h, x, y + h - this.radius);
		Runtime.Canvas.lineTo(x, y + this.radius);
		Runtime.Canvas.quadraticCurveTo(x, y, x + this.radius, y);
		Runtime.Canvas.closePath();
		if (this.fill) {
			Runtime.Canvas.fillStyle = this.colour;
			Runtime.Canvas.fill();
		}
		else {
			Runtime.Canvas.strokeStyle = this.colour;
			Runtime.Canvas.stroke();
		}
	}
});

/// Example: new Framework.Sprite.Image({src: 'asset/image.png', frames: [ { x: 0, y: 10, w: 10, h: 10 } ]})
Framework.Sprite.Image = new JS.Class({
	initialize: function(options) {
		this.frames = []; // contains a list of frame references (x,y,w,h) in the spritesheet for each frame.  Only x and y are required.
		this.frame = 0; // current frame index
		this.alpha = 1; // 0 = invisible, 1 = opaque
		this.src = null; // REQUIRED: reference to the spritesheet
		$.extend(this, options);
		if (this.src == null)
			console.log('ERROR: Image sprite created without a source', this);
		for (var i=0; i < this.frames.length; i++) {
			if (this.frames[i].x == null || this.frames[i].y == null)
				console.log('ERROR: Image frame created without x and y source values', this);
		}
		var img = new Image();
		img.src = this.src;
		this.src = img;
	},
	update: function() {

	},
	draw: function(x, y, w, h) {
		Runtime.Canvas.globalAlpha = this.alpha;
		if (this.frames.length == 0)
			Runtime.Canvas.drawImage(this.src, x, y, w, h);
		else {
			Runtime.Canvas.drawImage(this.src, this.frames[this.frame].x, this.frames[this.frame].y, this.frames[this.frame].w || w, this.frames[this.frame].h || h, x, y, w, h);
		}
	}
});