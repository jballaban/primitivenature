Game.EditorScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.world = [];
		this.worldWidth = 15;
		this.worldHeight = 15;
		for (var y = 0; y < this.worldWidth; y++) {
			this.world[y] = [];
			for (var x = 0; x < this.worldHeight; x++) {
				this.world[y][x] = new Framework.Sprite(['asset/Terrain/ts_grass'+(Math.floor(Math.random()*6))+'/straight/45/0.png']);
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
				var x_pos = (x - y) * 64/2; //width/2
				var y_pos = (x+y) * 32/2; //height/2
				this.world[y][x].draw(x_pos+600, y_pos, 64, 64);
			}
		}
	}
});