"use strict";
Global.loader.load(['lib/Framework/Framework.js'], function() {
	class Runtime {
		constructor() {
			this.dt = null;
			this.last = window.performance.now();
			this.screen = null;
			this.canvas = this._createCanvas();
			this.resize();
			this.audio = null;
		}

		_createCanvas() {
			var body = document.getElementsByTagName('body')[0];
		    var canvas = document.createElement('canvas');
		    body.appendChild(canvas);
		    return canvas.getContext("2d");
		}

		resize() {
			this.canvas.canvas.width = this.canvas.width = window.innerWidth;
			this.canvas.canvas.height = this.canvas.height = window.innerHeight;
			if (this.screen != null) {
				this.screen.width = window.innerWidth;
				this.screen.height = window.innerHeight;
				this.screen.reposition();
			}
		}

		playMusic() {
			var body = document.getElementsByTagName('body')[0];
			if (this.audio == null) {
			    var audio = document.createElement('audio');
			    audio.setAttribute('hidden','true');
			    audio.setAttribute('loop','true');
			    audio.setAttribute('autoplay', 'true');
			    var source = document.createElement('source');
			    source.setAttribute('src', 'asset/soundtrack.mp3');
			    source.setAttribute('type', 'audio/mpeg');
			    audio.appendChild(source);
		    	body.appendChild(audio);
			}
		}

		setScreen (screen) {
			this.screen = screen;
			this.resize();
			//Framework.MouseHandler.reset(screen.mouse);
		}

		_update () {
			this.screen.update();
			//Framework.MouseHandler.update(Runtime.Screen);
		}

		_draw () {
			this.screen.draw();
			//Framework.MouseHandler.draw();
		}

		_frame () {
			Framework.FPS.tickStart();
			var now = window.performance.now();
			this.dt = Math.min(1, (now - this.last) / 1000);
			this._update();
			this._draw();
			this.last = now;
			Framework.FPS.tick();
		}

		start () {
			setInterval(function() { this._frame(); }.bind(this), 0);
		}

		getParameterByName(name) {
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

	}
	Framework.Runtime = Runtime;
	Global.loader.loaded('lib/Framework/Runtime.js');
});

/*

JS.packages(function() { with(this) {
    file('lib/MenuScreen.js')
    	.provides('Game.MenuScreen')
    	.requires('Framework.Screen', 'Framework.Menu', 'Framework.Button', 'Framework.Mouse');
    file('lib/LoadScreen.js')
    	.provides('Game.LoadScreen')
    	.requires('Framework.Screen', 'Framework.Button');
    file('lib/EditorScreen.js').provides('Game.EditorScreen').requires('Framework.Screen', 'Game.Tiles', 'Framework.Menu');
    file('lib/Tiles.js').provides('Game.Tiles').requires('Framework.Element');
}});

function 

JS.require('Game.EditorScreen','Game.LoadScreen', 'Game.MenuScreen', function() {
	Runtime.Canvas = $('canvas').get(0).getContext("2d");
	if (getParameterByName('screen') == 'editor')
		Game.setScreen(new Game.EditorScreen());
	else
		Game.setScreen(new Game.LoadScreen());
	if (getParameterByName('music') == 'off')
		$('audio').get(0).pause();
	Game.resize();
	
	$(window).resize(Game.resize);
});
*/