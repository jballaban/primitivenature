Game.EditorScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.world = [];
		this.mouse = new Framework.Mouse(Framework.Cursors.Pointer);
		this.worldWidth = 15;
		this.worldHeight = 15;
		for (var y = 0; y < this.worldWidth; y++) {
			this.world[y] = [];
			for (var x = 0; x < this.worldHeight; x++) {
				this.world[y][x] = new Framework.Sprite.Image({src: ['asset/Terrain/top_down/grass'+(Math.floor(Math.random()*6))+'/straight/0/0.png'] });
			}
		}
	},
	update: function() {
		this.callSuper();
	},
	draw: function() {
		this.callSuper();
		for(var y = 0; y < this.worldHeight; y++) {
			for (var x = 0; x < this.worldWidth; x++) {
				this.world[y][x].draw(x*64, y*64, 64, 64);
			}
		}
	}
});