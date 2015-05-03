Game.LoadScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.sprite = new Framework.Sprite.Image({ src: 'asset/Menu/background.jpg', alpha: 0 });
	},
	update: function() {
		this.sprite.alpha+=.01;
		if (this.sprite.alpha >= 1) {
			Game.setScreen(new Game.MenuScreen());
		}
	}
});