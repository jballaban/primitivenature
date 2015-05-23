"use strict";
Global.loader.load(['lib/Framework/Screen.js'],function(){
	Game.IntroScreen = (function() {
		class IntroScreen extends Framework.Screen{
			constructor(options){
				super(options);
				this.mouse = new Framework.Mouse({element:Framework.Cursors.Pointer });
				this.loaded = false;
			}

			mouseClick() {
				Runtime.stopVideo();
				Runtime.setScreen(new Game.MenuScreen());
			}

			update() {
				if (!this.loaded) {
					this.video = Runtime.playVideo('asset/intro.mp4', function() {
						Runtime.setScreen(new Game.MenuScreen());
					});
					this.loaded = true;
				}
			}
		}
		return IntroScreen;
	})();
});