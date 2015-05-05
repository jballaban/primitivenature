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
				this.addElement(new Game.Tiles.Ground({ x: x*this.tileWidth, y: y*this.tileHeight }));
			}
		}
	},
	insert: function (tileX, tileY, el) {
		var sametype = this.elements[this.mapTileToIndex(tileX, tileY)].isA(el.klass);
		el.x = tileX*this.tileWidth;
		el.y = tileY*this.tileHeight;
		el.width = this.tileWidth;
		el.height = this.tileHeight;
		el.parent = this;
		this.elements[this.mapTileToIndex(tileX, tileY)] = el;
		if (sametype)
			return; // we don't want to reset adjacents if our overall type didn't change
		var adjacent = this.getAdjacent(tileX, tileY);
		if (el.isA(Game.Tiles.Grass)) {
			for (var i=0;i<adjacent.length;i++) {
				if (adjacent[i] != null) {
					adjacent[i].grass = true; // TODO: generesize
				}
			}
		}
		for (var i=0;i<adjacent.length;i++) {
			if (adjacent[i] != null) {
				var tile = this.mapCoordToTile(adjacent[i].x, adjacent[i].y);
				var newel = adjacent[i].blend(this.getAdjacent(tile.tileX, tile.tileY));
				if (newel != null)
					this.insert(tile.tileX, tile.tileY, newel);
			}
		}
	},
	getAdjacent: function(tileX, tileY) {
		var adjacent = [];
		adjacent.push(tileX > 0 && tileY < this.tilesHeight-1 ? this.elements[this.mapTileToIndex(tileX-1,tileY+1)] : null);
		adjacent.push(tileY < this.tilesHeight-1 ? this.elements[this.mapTileToIndex(tileX,tileY+1)] : null);
		adjacent.push(tileX < this.tilesWidth-1 && tileY < this.tilesHeight ? this.elements[this.mapTileToIndex(tileX+1,tileY+1)] : null);
		adjacent.push(tileX > 0 ? this.elements[this.mapTileToIndex(tileX-1,tileY)] : null);
		adjacent.push(null);
		adjacent.push(tileX < this.tilesWidth-1 ? this.elements[this.mapTileToIndex(tileX+1,tileY)] : null);
		adjacent.push(tileX > 0 && tileY > 0 ? this.elements[this.mapTileToIndex(tileX-1,tileY-1)] : null);
		adjacent.push(tileY > 0 ? this.elements[this.mapTileToIndex(tileX,tileY-1)] : null);
		adjacent.push(tileX < this.tilesWidth-1 && tileY > 0 ? this.elements[this.mapTileToIndex(tileX+1,tileY-1)] : null);
		return adjacent;
	},
	blendTiles: function(el, tileX, tileY) {
		;
		var newel = el.blend(adjacent);
		if (newel.klass != el.klass) {
			this.insert(tileX, tileY, newel);
		}
	},
	mapCoordToTile: function(x, y) { 
		return {
			tileX: Math.floor(x / this.tileWidth),
			tileY: Math.floor(y / this.tileHeight)
		}
	},
	mapTileToIndex: function(tileX, tileY) {
		return tileY*this.tilesWidth+tileX;
	}
});