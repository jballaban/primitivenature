"use strict";
Global.loader.load([], function() {
	Framework.Text = (function() {
		class Text {
			constructor(options) {
				options = options || {}
				this.colour = options.colour || '#000';
				this.alpha = Math.min(1, options.alpha || 1);
				if (options.label == null) {
					console.log('Text required');
					debugger;
				}
				this.halign = options.halign;
				this.label = options.label;
				this.font = options.font || font;
				Runtime.canvas.font = this.font;
				this.width = options.width || Runtime.canvas.measureText(this.label).width;
			}

			draw(x, y, w, h, a) {
				var offsetX = 0;
				if (this.halign == 'right') {
					offsetX = w-this.width;
				}
				Runtime.canvas.globalAlpha = this.alpha*a;
				Runtime.canvas.font = this.font;
				Runtime.canvas.fillStyle = this.colour;
			Runtime.canvas.fillText(this.label, x+offsetX, y, Math.min(w, this.width));
			}
		}
		return Text;
	})();
});