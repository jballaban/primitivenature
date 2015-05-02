Framework.Sprite =  {};

Framework.Sprite.Rectangle = new JS.Class({
	initialize: function(options) {
		this.colour = '#000';
		this.alpha = 1;
		this.cornerRadius = 5;
		$.extend(this, options);
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

Framework.Sprite.Image = new JS.Class({
	initialize: function(options) {
		this.frames = [];
		this.frame = 0;
		this.alpha = 1;
		this.src = [];
		$.extend(this, options);
		for (var i=0;i<this.src.length;i++) {
			var img = new Image();
			img.src = this.src[i];
			this.frames.push(img);
		}
	},
	draw: function(x, y, w, h) {
		Runtime.Canvas.globalAlpha = this.alpha;
		Runtime.Canvas.drawImage(this.frames[this.frame], x, y, w, h);
	}
});