Game.LoadScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.sprite = new Framework.Sprite.Image({ src: ['asset/Menu/background.jpg'], alpha: 0 });
	},
	update: function() {
		if (this.sprite.alpha < 1)
			this.sprite.alpha+=.01;
		if (this.sprite.alpha >= 0.4) { //actually not sure why the image appears fully at 0.4, would have expected 1!
			Game.setScreen(new Game.MenuScreen());
		}
	}
});