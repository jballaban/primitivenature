Game.World = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		this.tilesWidth = null; // REQUIRED: number of columns
		this.tilesHeight = null; // REQUIRED: number of rows
		this.tileWidth = 32;
		this.tileHeight = 32;
		$.extend(this, options);
		var tiles = new Framework.Element();
		for (var y = 0; y < this.tilesHeight; y++) {
			for (var x = 0; x < this.tilesWidth; x++) {
				tiles.addElement(new Game.Tiles.Ground({ x: x*this.tileWidth, y: y*this.tileHeight, width: this.tileWidth, height: this.tileHeight }));
			}
		}
		this.addElement(tiles);
	}
});