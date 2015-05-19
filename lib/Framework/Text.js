"use strict";
Global.loader.load([], function() {
	class Text {
		constructor(options) {
			options = options || {}
			this.colour = options.colour || '#000';
			this.alpha = options.alpha || 1;
			if (options.label == null) {
				console.log('Text required');
				debugger;
			}
			this.label = options.label;
			this.font = options.font || font;
			Runtime.canvas.font = this.font;
			this.width = options.width || Runtime.canvas.measureText(this.label).width;
		}

		draw(x, y, w, h) {
			Runtime.canvas.globalAlpha = this.alpha;
			Runtime.canvas.font = this.font;
			Runtime.canvas.fillStyle = this.colour;
		Runtime.canvas.fillText(this.label, x, y, Math.min(w, this.width));
		}
	}
	Framework.Text = Text;
	Global.loader.loaded('lib/Framework/Text.js');
});