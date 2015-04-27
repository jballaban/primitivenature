Framework.Sprite = new JS.Class({
	initialize: function(src) {
		this.frames = [];
		this.frame = 0;
		this.colour = null;
		this.alpha = 1;
		if (src != null) {
			for (var i=0;i<src.length;i++) {
				var img = new Image();
				img.src = src[i];
				this.frames.push(img);
			}
		}
	},
	draw: function(x, y, w, h) {
		Runtime.Canvas.globalAlpha = this.alpha;
		if (this.frames.length > 0)
			Runtime.Canvas.drawImage(this.frames[this.frame], x, y, w, h);
		else {
			var r = 5;
			Runtime.Canvas.fillStyle = this.colour == null ? '#000' : this.colour;
			Runtime.Canvas.beginPath();
			Runtime.Canvas.moveTo(x + r, y);
			Runtime.Canvas.lineTo(x + w - r, y);
			Runtime.Canvas.quadraticCurveTo(x + w, y, x + w, y + r);
			Runtime.Canvas.lineTo(x + w, y + h - r);
			Runtime.Canvas.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
			Runtime.Canvas.lineTo(x + r, y + h);
			Runtime.Canvas.quadraticCurveTo(x, y + h, x, y + h - r);
			Runtime.Canvas.lineTo(x, y + r);
			Runtime.Canvas.quadraticCurveTo(x, y, x + r, y);
			Runtime.Canvas.closePath();
			Runtime.Canvas.fill();
		}
	}
});