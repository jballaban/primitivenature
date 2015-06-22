"use strict";
Global.loader.load(['lib/Framework/Screen.js', 'lib/Game/MenuScreen.js'],function(){
	Game.LoadScreen = (function() {
		class LoadScreen extends Framework.Screen{
			constructor(options){
				super(options);
				this.sprite = new Framework.Sprite.Image({ src: 'asset/cover.jpg', alpha: 0 });
				this.mouse = new Framework.Mouse({element:Framework.Cursors.Invisible });
				this.up = true;
			}

			mouseClick() {
				Runtime.setScreen(new Game.MenuScreen());
			}

			update(){
				if(this.up) {
					this.sprite.alpha+=.01;
					if (this.sprite.alpha >= 1.5)
						this.up = false;
				}
				else {
					this.sprite.alpha-=.01;
					if (this.sprite.alpha <= 0) {
						if (Game.Settings.playIntro)
							Runtime.setScreen(new Game.IntroScreen());
						else
							Runtime.setScreen(new Game.MenuScreen());
					}
				}
			}
		}
		return LoadScreen;
	})();
});