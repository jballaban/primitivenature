Framework.World = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		this.tileWidth = 0;
		this.tileHeight = 0;
		$.extend(this, options);
		var tiles = new Framework.Element();
		for (var y = 0; y < this.tileHeight; y++) {
			for (var x = 0; x < this.tileWidth; x++) {
				tiles.addElement(new Framework.GroundTile({ x: x*64, y: y*64}));
			}
		}
		this.addElement(tiles);
	}
});

Framework.GroundTile = new JS.Class(Framework.Element, {
	initialize: function() {
		this.callSuper();
		this.width = 64;
		this.height = 64;
		this.sprite = new Framework.Sprite.Image({src: ['asset/Terrain/top_down/grass'+(Math.floor(Math.random()*6))+'/straight/0/0.png'] });
	}
});