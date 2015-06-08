"use strict";
Global.loader.load([], function() {
	
	Framework.Sprite = {};

	Framework.Sprite.Invisible = (function() {
		class Invisible {
			update() {}
			draw(x, y, w, h, a) {}
		}
		return Invisible;
	})();

	Framework.Sprite.Rectangle = (function() {
		class Rectangle {
			constructor(options) {
				options = options || {};
				this.colour = options.colour || '#000';
				this.alpha = Math.min(1, options.alpha || 1);
				this.radius = options.radius || 5;
				this.fill = options.fill || true;
			}

			update() {}

			draw(x, y, w, h, a) {
				Runtime.canvas.globalAlpha = this.alpha * a;
				Runtime.canvas.beginPath();
				Runtime.canvas.moveTo(x + this.radius, y);
				Runtime.canvas.lineTo(x + w - this.radius, y);
				Runtime.canvas.quadraticCurveTo(x + w, y, x + w, y + this.radius);
				Runtime.canvas.lineTo(x + w, y + h - this.radius);
				Runtime.canvas.quadraticCurveTo(x + w, y + h, x + w - this.radius, y + h);
				Runtime.canvas.lineTo(x + this.radius, y + h);
				Runtime.canvas.quadraticCurveTo(x, y + h, x, y + h - this.radius);
				Runtime.canvas.lineTo(x, y + this.radius);
				Runtime.canvas.quadraticCurveTo(x, y, x + this.radius, y);
				Runtime.canvas.closePath();
				if (this.fill) {
					Runtime.canvas.fillStyle = this.colour;
					Runtime.canvas.fill();
				}
				else {
					Runtime.canvas.strokeStyle = this.colour;
					Runtime.canvas.stroke();
				}
			}
		}
		return Rectangle;
	})();
	
	Framework.Sprite.Image = (function() {
		class SpriteImage {
			constructor(options) {
				options = options || {};
				this.frames = options.frames==null ? [] : options.frames;
				this.frame = 0;
				this.alpha = Math.min(1,options.alpha==null ? 1 : options.alpha);
				if (options.src == null) {
					console.log('src required');
					debugger;
				}
				for (let i=0; i<this.frames.length; i++) {
					if (this.frames[i].x == null || this.frames[i].y == null) {
						console.log('ERROR: Image frame created without x and y source values');
						debugger;
					}
				}
				var img = new Image();
				img.src = options.src;
				this.src = img;
			}

			update() {}

			draw(x, y, w, h, a) {
				Runtime.canvas.globalAlpha = this.alpha * a;
				if (this.frames.length == 0)
					Runtime.canvas.drawImage(this.src, x, y, w, h);
				else {
					Runtime.canvas.drawImage(this.src, this.frames[this.frame].x, this.frames[this.frame].y, this.frames[this.frame].w || w, this.frames[this.frame].h || h, x, y, w, h);
				}
			}
		}
		return SpriteImage;
	})();
});