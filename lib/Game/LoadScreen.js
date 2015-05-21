"use strict";
Global.loader.load(['lib/Framework/Screen.js', 'lib/Game/MenuScreen.js'],function(){
	Game.LoadScreen = (function() {
		class LoadScreen extends Framework.Screen{
			constructor(options){
				super(options);
				this.sprite = new Framework.Sprite.Image({ src: 'asset/cover.jpg', alpha: 0 });
				this.up = true;
			}
			update(){
				if(this.up)
					this.sprite.alpha+=.003;
				else
					this.sprite.alpha-=.01;
				if(this.sprite.alpha >= 1.4)
					this.up = false;
				else if (!this.up && this.sprite.alpha <= 0)
					Runtime.setScreen(new Game.MenuScreen());
			}
		}
		return LoadScreen;
	})();
});