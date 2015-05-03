Framework.Sprite =  {};

Framework.Sprite.Rectangle = new JS.Class({
	initialize: function(options) {
		this.colour = '#000';
		this.alpha = 1;
		this.cornerRadius = 5;
		$.extend(this, options);
	},
	update: function() {

	},
	draw: function(x, y, w, h) {
		Runtime.Canvas.globalAlpha = this.alpha;
		Runtime.Canvas.fillStyle = this.colour;
		Runtime.Canvas.beginPath();
		Runtime.Canvas.moveTo(x + this.cornerRadius, y);
		Runtime.Canvas.lineTo(x + w - this.cornerRadius, y);
		Runtime.Canvas.quadraticCurveTo(x + w, y, x + w, y + this.cornerRadius);
		Runtime.Canvas.lineTo(x + w, y + h - this.cornerRadius);
		Runtime.Canvas.quadraticCurveTo(x + w, y + h, x + w - this.cornerRadius, y + h);
		Runtime.Canvas.lineTo(x + this.cornerRadius, y + h);
		Runtime.Canvas.quadraticCurveTo(x, y + h, x, y + h - this.cornerRadius);
		Runtime.Canvas.lineTo(x, y + this.cornerRadius);
		Runtime.Canvas.quadraticCurveTo(x, y, x + this.cornerRadius, y);
		Runtime.Canvas.closePath();
		Runtime.Canvas.fill();
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
			Runtime.Canvas.drawImage(this.src, x, y, w, h, this.frames[frame].x, this.frames[frame].y, this.frames[frame].w || w, this.frames[frame].h || h);
		}
	}
});