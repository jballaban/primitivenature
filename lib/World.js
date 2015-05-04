Game.World = new JS.Class(Framework.Element, {
	initialize : function(options) {
		this.callSuper();
		this.tilesWidth = null; // REQUIRED: number of columns
		this.tilesHeight = null; // REQUIRED: number of rows
		this.tileWidth = 32;
		this.tileHeight = 32;
		$.extend(this, options);
		for (var y = 0; y < this.tilesHeight; y++) {
			for (var x = 0; x < this.tilesWidth; x++) {
				this.addElement(new Game.Tiles.Ground({ x: x*this.tileWidth, y: y*this.tileHeight, width: this.tileWidth, height: this.tileHeight, tileX: x, tileY: y }));
			}
		}
	},
	insert: function (tileX, tileY, eltype) {
		if (this.elements[this.mapTileToIndex(tileX, tileY)].isA(eltype))
			return;
		var el = new eltype({
			x: tileX*this.tileWidth,
			y: tileY*this.tileHeight,
			width: this.tileWidth,
			height: this.tileHeight,
			tileX: tileX,
			tileY: tileY
		});
		el.parent = this;
		this.elements[this.mapTileToIndex(tileX, tileY)] = el;
	},
	mapCoordToTile: function(x, y) { 
		return {
			x: Math.floor(x / this.tileWidth),
			y: Math.floor(y / this.tileHeight)
		}
	},
	mapTileToIndex: function(tileX, tileY) {
		return tileY*this.tilesWidth+tileX;
	}
});