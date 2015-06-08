"use strict";
Global.loader.load(['lib/Framework/Framework.js'], function() {
	Framework.Runtime = (function() {
		class Runtime {
			constructor() {
				this.dt = null;
				this.last = window.performance.now();
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

			fullscreen(start) {
				if (start)
					document.documentElement.webkitRequestFullscreen();
				else
					document.webkitExitFullscreen();
			}

			resize() {
				var wndWidth = window.innerWidth,
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

			playMusic(play) {
				let body = document.getElementsByTagName('body')[0];
				if (play) {
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
				} else {
					let audio = document.getElementsByTagName('audio')[0];
					body.removeChild(audio);
				}
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

			_frame () {
				Framework.FPS.tickStart();
				var now = window.performance.now();
				this.dt = Math.min(1, (now - this.last) / 1000);
				this._update();
				this._draw();
				this.last = now;
				Framework.FPS.tick();
				requestAnimationFrame(function() { this._frame(); }.bind(this));
			}

			start () {
				this._frame();
				//setInterval(function() { this._frame(); }.bind(this), 0);
			}

			getParameterByName(name) {
			    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			        results = regex.exec(location.search);
			    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

		}
		return Runtime;
	})();
});