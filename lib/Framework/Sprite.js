Framework.Sprite = new JS.Class({
	initialize: function(src) {
		this.frames = [];
		this.frame = 0;
		this.colour = null;
		if (src != null) {
			for (var i=0;i<src.length;i++) {
				var img = new Image();
				img.src = src[i];
				this.frames.push(img);
			}
		}
	},
	draw: function(x, y, w, h) {
		if (this.frames.length > 0)
			Runtime.Canvas.drawImage(this.frames[this.frame], x, y, w, h);
		else if (this.colour != null) {
			Runtime.Canvas.fillStyle = this.colour;
			Runtime.Canvas.fillRect(x, y, w, h);
		}
	}
});
