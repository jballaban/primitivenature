"use strict";
Global.loader.load(['lib/Framework/Element.js'],function(){
	
	Framework.Cursors = {
		Invisible: new Framework.Element({ width: 1, height: 1 }),
		Pointer: new Framework.Element({ width: 26, height: 26, sprite: new Framework.Sprite.Image({ src: 'asset/cursor.png' }) })
	}

	Framework.Mouse = (function(){
		class Mouse {
			constructor(options){
				options = options || {};
				this.x = 0;
				this.y = 0;
				this.leftButtonPressed = false;
				if (options.element == null) {
					console.log('ERROR: Must supply element to mouse')
					debugger;
				}
				this.element = options.element;
			}

			up(){
				this.leftButtonPressed = false;
				if (Framework.MouseHandler.focus != null)
					Framework.MouseHandler.focus.mouseClick();
			}

			down(){
				this.leftButtonPressed = true;
			}

			move(x, y){
				this.element.x = this.x = x;
				this.element.y = this.y = y;
				this.element.reposition();
			}

			update() {}
			
			draw() {
				this.element.draw(1);
			}
		}
		return Mouse;
	}());

	Framework.MouseHandler = (function(){
		class MouseHandler{
			constructor(){
				this.x = 0;
				this.y = 0;
				this.focus = null; // focused Framework.Element
				this.mouse = null;
				this.needsLock = true;
				this.clientAreaWidth = 0;
				this.clientAreaHeight = 0;

				document.addEventListener('mousedown', function(e){
					Framework.MouseHandler.mouseDown(e);
				}.bind(this));
				
				document.addEventListener('mousemove', function(e) { Framework.MouseHandler.mouseMove(e); });

				document.addEventListener('mouseup', function(e) {
					Framework.MouseHandler.mouseUp(e);
				}.bind(this));

				document.addEventListener('pointerlockchange', function(){
					this.needsLock = (document.pointerLockElement === null);
				}.bind(this));

			}

			setLock(lock) {
				if (lock)
					document.body.requestPointerLock();
				else
					document.exitPointerLock();
			}

			resize(width, height){
				this.clientAreaWidth = width;
				this.clientAreaHeight = height;
			}

			reset(mouse) { // resets with the given mouse
				this.focus = null;
				this.mouse = mouse;
			}

			update(screen) { // current Framework.Screen
				var newfocus = screen.elementAt(this.x, this.y);
				if (newfocus != this.focus) {
					if (this.focus != null)
						this.focus.mouseOut();
					this.focus = newfocus;
					if (this.focus != null) {
						this.focus.mouseOver();
						this.mouse = this.focus.getMouse();
						if (this.mouse != null)
							this.mouse.move(this.x, this.y);
					}
				}
				if (this.mouse != null)
					this.mouse.update();
			}
			draw() {
				if (this.mouse != null)
					this.mouse.draw();
			}
			mouseUp(e) {
				if (this.mouse != null)
					this.mouse.up();
			}
			mouseMove(e) {
				if(this.needsLock){
					this.x = e.clientX;
					this.y = e.clientY;
				}
				else{
					this.x += e.movementX;
					this.y += e.movementY;
					if(this.x < 0){
						this.x = 0;
					}else if(this.x >= this.clientAreaWidth){
						this.x = this.clientAreaWidth-1;
					}
					if(this.y < 0){
						this.y = 0;
					}else if(this.y >= this.clientAreaHeight){
						this.y = this.clientAreaHeight-1;
					}
				}
				if (this.mouse != null)
					this.mouse.move(this.x, this.y);
			}
			mouseDown(e) {
				e.preventDefault();
				if (this.mouse != null)
					this.mouse.down();
			}

		}
		return new MouseHandler();
	}());
});