"use strict";
Global.loader.load(['lib/Framework/Element.js'],function(){
	Framework.MouseStates = {
		Pointing: {
			initState: function() {
				this.element = Framework.Cursors.Pointer;
				this.element.x = this.x;
				this.element.y = this.y;
			},
			mouseMove: function(e) {
				this.element.x = this.x = e.clientX;
				this.element.y = this.y = e.clientY;
			},
			draw: function() {
				this.element.draw();
			}
		},
		Clicking: {
			initState: function() {
				this.element = Framework.Cursors.Clicker;
				this.element.x = this.x;
				this.element.y = this.y;
			},
			mouseMove: function(e) {
				if (Math.abs(this.x - e.clientX) > 10 || Math.abs(this.y - e.clientY) > 10) {
					Framework.Mouse.setState(Framework.MouseStates.Selecting);
				}
			},
			mouseUp : function(e) {
				Framework.Mouse.setState(Framework.MouseStates.Pointing);
			},
			draw: function() {
				this.element.draw();
			}
		},
		Selecting: {
			initState: function() {
				this.element = Framework.Cursors.Selector;
				this.element.x = this.x;
				this.element.y = this.y;
			},
			mouseMove: function(e) {
				this.element.x = e.clientX;
				this.element.y = e.clientY;
				this.width = e.clientX - this.x;
				this.height = e.clientY - this.y;
			},
			mouseUp: function(e) {
				Framework.Mouse.setState(Framework.MouseStates.Pointing);
			},
			draw: function() {
				Runtime.Canvas.globalAlpha = 0.2;
				Runtime.Canvas.fillStyle = '#fff';
				Runtime.Canvas.fillRect(this.x,this.y,this.width,this.height);
				Runtime.Canvas.globalAlpha = 1;
				this.element.draw();
			}
		}
	};

	Framework.Cursors = {}

	Framework.Cursors.Invisible = new Framework.Element();
	Framework.Cursors.Invisible.width = 1;
	Framework.Cursors.Invisible.height = 1;

	Framework.Cursors.Pointer = new Framework.Element();
	Framework.Cursors.Pointer.width = 26;
	Framework.Cursors.Pointer.height = 26;
	Framework.Cursors.Pointer.sprite = new Framework.Sprite.Image({ src: 'asset/cursor.png' });

	Framework.Cursors.Clicker = new Framework.Element();
	Framework.Cursors.Clicker.width = 32;
	Framework.Cursors.Clicker.height = 32;
	Framework.Cursors.Clicker.colour = '#0F0';

	Framework.Cursors.Selector = new Framework.Element();
	Framework.Cursors.Selector.width = 32;
	Framework.Cursors.Selector.height = 32;
	Framework.Cursors.Selector.colour = '#F00';

	Framework.Mouse = (function(){
		class Mouse{
			constructor(options){
				if(options && options.constructor && options.constructor.name === "Element"){
					let el = options;
					options = arguments[1];
					if(!options)
						options={};
					options.element = el;
				}
				this.x = 0;
				this.y = 0;
				this.leftButtonPressed = false;
				if (!options || !options.element)
					console.log('ERROR: Must supply element to mouse')
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
				this.x = x;
				this.y = y;
			}
			update() {
				this.element.x = this.x;
				this.element.y = this.y;
				this.element.update();
			}
			draw() {
				this.element.draw();
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

				document.addEventListener('mousedown', function(e){
					if(!this.needsLock)
						Framework.MouseHandler.mouseDown(e);
				}.bind(this));
				document.addEventListener('mousemove', function(e) { Framework.MouseHandler.mouseMove(e); });
				document.addEventListener('mouseup', function(e) {
					if(this.needsLock){
						document.body.requestPointerLock();
					}else{
						Framework.MouseHandler.mouseUp(e);
					}
				}.bind(this));
				document.addEventListener('pointerlockchange', function(){
					this.needsLock = (document.pointerLockElement === null);
					this.handleResize();
				}.bind(this));

				window.addEventListener('resize',this.handleResize);
				this.handleResize();
			}
			handleResize(){
				console.log(this);
				if(!this.needsLock){
					this.clientAreaWidth = document.pointerLockElement.offsetWidth;
					this.clientAreaHeight = document.pointerLockElement.offsetHeight;
				}
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
				//this.x = e.clientX;
				//this.y = e.clientY;
				//this.height = 1;
				//this.width = 1;
				//Framework.Mouse.setState(Framework.MouseStates.Clicking);
			}

		}
		return MouseHandler;
	}());
});