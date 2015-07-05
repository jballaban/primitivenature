"use strict";
Global.loader.load([], function(undefined) {
	
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
				if (options.src === null && ((!!options.width && options.width > 0) || (!!options.height && options.height > 0))){
					console.log('src required');
					debugger;
				}
				for (let i=0; i<this.frames.length; i++) {
					if (this.frames[i].x == null || this.frames[i].y == null) {
						console.log('ERROR: Image frame created without x and y source values');
						debugger;
					}
				}
				this.img = new Image();
				if(options.src){
					this.loaded = false;
					this.img.addEventListener('load',function(){
						this.loaded = true;
						if(options.loaded)
							options.loaded();
					}.bind(this),false);

					this.img.src = options.src + '?' + new Date().getTime();
				}else{
					let canvas = document.createElement('canvas'), ctx;
					canvas.width = options.width;
					canvas.height = options.height;

					this.img.src = canvas.toDataURL();
					this.loaded = true;
					if(options.loaded)
						options.loaded();
				}
			}

			getContext(leaveblank){
				if(leaveblank===undefined)
					leaveblank = false;
				let canvas = document.createElement('canvas');
				canvas.width = this.img.naturalWidth;
				canvas.height = this.img.naturalHeight;
				let ctxt = canvas.getContext('2d');
				if(!leaveblank)
					ctxt.drawImage(this.img,0,0);
				return ctxt;
			}

			getResizedSprite(newW,newH){
				return getResizedSpritePortion(0,0,this.img.naturalWidth, this.img.naturalHeight, newW, newH);
			}
			getResizedSpritePortion(sx,sy,sw,sh,newW,newH){
				var sprite = new SpriteImage({width:newW, height:newH}),ctx;
				ctx = sprite.getContext(true);
				ctx.drawImage(this.img,sx,sy,sw,sh,0,0,newW,newH);
				return sprite;
			}

			releaseContext(ctxt){
				let canvas = ctxt.canvas;
				this.img.src = canvas.toDataURL();
			}

			update() {}

			draw(x, y, w, h, a) {
				//Runtime.canvas.globalAlpha = this.alpha * a;
				if (this.frames.length === 0)
					Runtime.canvas.drawImage(this.img, x, y, w, h);
				else {
					Runtime.canvas.drawImage(this.img, this.frames[this.frame].x, this.frames[this.frame].y, this.frames[this.frame].w || w, this.frames[this.frame].h || h, x, y, w, h);
				}
			}
		}
		return SpriteImage;
	})();
});