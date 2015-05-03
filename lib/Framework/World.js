Framework.World = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		this.tileWidth = null; // REQUIRED: number of columns
		this.tileHeight = null; // REQUIRED: number of rows
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
	initialize: function(options) {
		this.callSuper();
		this.width = 64;
		this.height = 64;
		this.sprite = new Framework.Sprite.Image({src: 'asset/Terrain/top_down/grass'+(Math.floor(Math.random()*6))+'/straight/0/0.png' });
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.5, fill: true, radius: 36 })
		$.extend(this, options);
	},
	draw: function() {
		this.callSuper();
		if (this.hovered)
			this.hoversprite.draw(this.x, this.y, this.width, this.height);
	}
});