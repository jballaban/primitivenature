Framework.Text = new JS.Class({
	initialize: function(font, text) {
		this.colour = '#000';
		this.alpha = 1;
		this.text = text;
		this.font = font;
		Runtime.Canvas.font = font;
		this.width = Runtime.Canvas.measureText(text).width;
	},
	draw: function(x, y, w) {
		Runtime.Canvas.globalAlpha = this.alpha;
		Runtime.Canvas.font = this.font;
		Runtime.Canvas.fillStyle = this.colour;
      	Runtime.Canvas.fillText(this.text, x, y, Math.min(w, this.width));
	}
});