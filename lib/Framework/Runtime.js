"use strict";
Global.loader.load(['lib/Framework/Framework.js'], function() {
	Framework.Runtime = (function() {
		class Runtime {
			constructor(options) {
				options = options || {};
				this.millisecondsperupdate = 1000 / (options.updatespersecond || 60);
				this.last = window.performance.now();
				this.updatemillisecondsremaining = 0;
				this.screen = null;
				this.canvas = this._createCanvas();
				this.resize();
				this.audio = null;
				this.video = null;
			}

			_createCanvas() {
				var body = document.getElementsByTagName('body')[0];
			    var canvas = document.createElement('canvas');
			    body.appendChild(canvas);
			    return canvas.getContext("2d");
			}

			stopVideo() {
				this.video.parentNode.removeChild(this.video);
			}

			playVideo(src, callback) {
				var body = document.getElementsByTagName('body')[0];
			    var video = document.createElement('video');
			    var source = document.createElement('source');
			    video.setAttribute('width', window.innerWidth);
			    video.setAttribute('height', window.innerHeight);
			    source.setAttribute('src', src);
			    video.setAttribute('autoplay','true');
			    source.setAttribute('type', 'video/mp4');
			    video.appendChild(source);
			    body.appendChild(video);
			    video.onended = function() {
			    	this.stopVideo();
			    	callback();
			    }.bind(this);
			    this.video = video;
			}

			setFullscreen() {
				document.documentElement.webkitRequestFullscreen();
			}

			resize() {
				let wndWidth = window.innerWidth,
					wndHeight = window.innerHeight;
				this.canvas.canvas.width = this.canvas.width = wndWidth;
				this.canvas.canvas.height = this.canvas.height = wndHeight;
				if (this.screen != null) {
					this.screen.width = wndWidth;
					this.screen.height = wndHeight;
					this.screen.reposition();
				}
				Framework.MouseHandler.resize(wndWidth, wndHeight);
			}

			playMusic() {
				let body = document.getElementsByTagName('body')[0];
				if (this.audio == null) {
				    let audio = document.createElement('audio');
				    audio.setAttribute('hidden','true');
				    audio.setAttribute('loop','true');
				    audio.setAttribute('autoplay', 'true');
				    let source = document.createElement('source');
				    source.setAttribute('src', 'asset/soundtrack.mp3');
				    source.setAttribute('type', 'audio/mpeg');
				    audio.appendChild(source);
			    	body.appendChild(audio);
				}
			}

			stopMusic() {
				let body = document.getElementsByTagName('body')[0];
				let audio = document.getElementsByTagName('audio')[0];
				body.removeChild(audio);
			}

			setScreen (screen) {
				this.screen = screen;
				this.resize();
				Framework.MouseHandler.reset(screen.mouse);
			}

			_update () {
				this.screen.update();
				Framework.MouseHandler.update(this.screen);
			}

			_draw () {
				this.screen.draw(1);
				Framework.MouseHandler.draw();
			}

			_sleep (milliseconds) {
			  var start = new Date().getTime();
			  for (var i = 0; i < 1e7; i++) {
			    if ((new Date().getTime() - start) > milliseconds){
			      break;
			    }
			  }
			}

			_frame () {
				let now = window.performance.now();
				let dt = now - this.last + this.updatemillisecondsremaining; // number of milliseconds passed + remainder from last frame
				let updates = Math.floor(dt / this.millisecondsperupdate);
				this.updatemillisecondsremaining = dt - updates * this.millisecondsperupdate;
				for (let i=0; i<updates; i++)
				this._update();
				this._draw();
				this.last = now;
				Framework.FPS.tick();
			}

			start () {
				Framework.FPS.tickStart();
				this._frame();
				setInterval(function() { this._frame(); }.bind(this), 0);
			}

			getParameterByName(name) {
			    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
			    let results = regex.exec(location.search);
			    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

		}
		return Runtime;
	})();
});