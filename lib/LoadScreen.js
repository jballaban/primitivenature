Game.LoadScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.sprite = new Framework.Sprite.Image({ src: 'asset/Menu/background.jpg', alpha: 0 });
	},
	update: function() {
		this.sprite.alpha+=.001;
		if (this.sprite.alpha >= 0.1) { // TODO: actually not sure why the image appears fully at 0.1, would have expected 1!
			Game.setScreen(new Game.MenuScreen());
		}
	}
});