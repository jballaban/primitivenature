"use strict";
Global.loader.load(['lib/Framework/Storage.js'], function() {
	Game.Settings = (function() {
		class Settings {
			constructor() {
				this.store = new Framework.Storage();
				this.data = {
					playIntro: true,
					fullscreen: false,
					playMusic: false,
					lockMouse: false
				}
				this._load();
			}

			get playIntro() {
				return this.data.playIntro;
			}

			set playIntro(value) {
				this.data.playIntro = value;
				this._save();
			}

			get fullscreen() {
				return this.data.fullscreen;
			}

			set fullscreen(value) {
				this.data.fullscreen = value;
				if (value)
					Runtime.setFullscreen();
				// does not save as we cannot persist state
			}

			get playMusic() {
				return this.data.playMusic;
			}

			set playMusic(value) {
				this.data.playMusic = value;
				this._save();
				if (value)
					Runtime.playMusic();
				else
					Runtime.stopMusic();
			}

			get lockMouse() {
				return this.data.lockMouse;
			}

			set lockMouse(value) {
				this.data.lockMouse = value;
				Framework.MouseHandler.setLock(value);
				// does not save as we cannot persist state
			}

			_save() {
				this.store.save('settings', this.data);
			}

			_load() {
				let result = this.store.load('settings');
				console.log(result);
				if (result == null)
					return;
				this.data = result;
			}

		}
		return Settings;
	})();
});