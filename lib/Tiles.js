Game.Tiles = {};

Game.Tiles.Summer = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.tileWidth = 32;
		this.tileHeight = 32;
		this.tilesWidth = null;
		this.tilesHeight = null;
		this.callSuper();
		if (this.tilesWidth == null || this.tilesHeight == null)
			console.log('tilesWidth and tilesHeight are required', this);
		var D = Game.Tiles.Type.Dirt;
		var G = Game.Tiles.Type.Grass;
		var W = Game.Tiles.Type.Water;
		var S = Game.Tiles.Type.Shade;
		this.selections = [
			// shade
			{ connections: [S, S, 
							S, S], sourceX: 3, sourceY: 18, length: 3 },
			{ connections: [S, D, 
							D, D], sourceX: 9, sourceY: 9, length: 1 },
			{ connections: [D, S, 
							D, D], sourceX: 10, sourceY: 9, length: 2 },
			{ connections: [S, S, 
							D, D], sourceX: 12, sourceY: 9, length: 3 },
			{ connections: [D, D, 
							S, D], sourceX: 15, sourceY: 9, length: 1 },
			{ connections: [S, D, 
							S, D], sourceX: 17, sourceY: 9, length: 3 },
			{ connections: [S, S, // ?
							S, D], sourceX: 1, sourceY: 10, length: 1 },
			{ connections: [D, S, // ?
							S, D], sourceX: 2, sourceY: 10, length: 1 },
			{ connections: [S, S, // ?
							S, S], sourceX: 3, sourceY: 10, length: 1 },
			{ connections: [D, D, 
							D, S], sourceX: 4, sourceY: 10, length: 1 },
			{ connections: [S, S, 
							D, S], sourceX: 5, sourceY: 10, length: 1 },
			{ connections: [D, S, 
							S, D], sourceX: 6, sourceY: 10, length: 1 },
			{ connections: [D, S, 
							D, S], sourceX: 7, sourceY: 10, length: 3 },
			{ connections: [S, D, // ?
							D, S], sourceX: 10, sourceY: 10, length: 1 },
			{ connections: [D, D, 
							S, S], sourceX: 11, sourceY: 10, length: 3 },
			{ connections: [S, D,  // ?
							S, S], sourceX: 14, sourceY: 10, length: 1 },
			{ connections: [D, S,  // ?
							S, S], sourceX: 15, sourceY: 10, length: 1 },
			// dirt
			{ connections: [D, D, 
							D, D], sourceX: 11, sourceY: 17, length: 3 },
			// grass
			{ connections: [G, G,
							G, G], sourceX: 14, sourceY: 18, length: 2 },
			{ connections: [D, G,
							G, G], sourceX: 4, sourceY: 14, length: 2 },
			{ connections: [G, D, 
							G, G], sourceX: 6, sourceY: 14, length: 2 },
			{ connections: [D, D, 
							G, G], sourceX: 8, sourceY: 14, length: 3 },
			{ connections: [G, G, 
							D, G], sourceX: 11, sourceY: 14, length: 2 },
			{ connections: [D, G, 
							D, G], sourceX: 13, sourceY: 14, length: 3 },
			{ connections: [G, D, 
							D, G], sourceX: 16, sourceY: 14, length: 2 },
			{ connections: [D, D, 
							D, G], sourceX: 18, sourceY: 14, length: 1 },
			{ connections: [G, G, 
							G, D], sourceX: 0, sourceY: 15, length: 2 },
			{ connections: [D, G, 
							G, D], sourceX: 2, sourceY: 15, length: 2 },
			{ connections: [G, D, 
							G, D], sourceX: 4, sourceY: 15, length: 3 },
			{ connections: [D, D, 
							G, D], sourceX: 7, sourceY: 15, length: 1 },
			{ connections: [G, G, 
							D, D], sourceX: 8, sourceY: 15, length: 3 },
			{ connections: [D, G, 
							D, D], sourceX: 11, sourceY: 15, length: 2 },
			{ connections: [G, D, 
							D, D], sourceX: 13, sourceY: 15, length: 2 },
			// water
			{ connections: [W, W, 
							W, W], sourceX: 15, sourceY: 15, length: 1 },
			{ connections: [W, D, 
							D, D], sourceX: 16, sourceY: 10, length: 2 },
			{ connections: [D, W, 
							D, D], sourceX: 18, sourceY: 10, length: 2 },
			{ connections: [W, W, 
							D, D], sourceX: 1, sourceY: 11, length: 3 },
			{ connections: [D, D, 
							W, D], sourceX: 4, sourceY: 11, length: 2 },
			{ connections: [W, D, 
							W, D], sourceX: 6, sourceY: 11, length: 3 },
			{ connections: [D, W, 
							W, D], sourceX: 9, sourceY: 11, length: 1 },
			{ connections: [W, W, 
							W, D], sourceX: 10, sourceY: 11, length: 2 },
			{ connections: [D, D, 
							D, W], sourceX: 12, sourceY: 11, length: 2 },
			{ connections: [W, D, 
							D, W], sourceX: 14, sourceY: 11, length: 1 },
			{ connections: [D, W, 
							D, W], sourceX: 15, sourceY: 11, length: 3 },
			{ connections: [W, W, 
							D, W], sourceX: 18, sourceY: 11, length: 2 },
			{ connections: [D, D, 
							W, W], sourceX: 1, sourceY: 12, length: 3 },
			{ connections: [W, D, 
							W, W], sourceX: 4, sourceY: 12, length: 2 },
			{ connections: [D, W, 
							W, W], sourceX: 6, sourceY: 12, length: 2 },
			{ connections: [D, W, 
							W, D], sourceX: 8, sourceY: 12, length: 1 },
			{ connections: [W, D, 
							D, W], sourceX: 9, sourceY: 12, length: 1 }
		];
		for (var y=0; y<this.tilesHeight; y++) {
			for (var x=0; x<this.tilesWidth; x++) {
				var el = this.addElement(new Game.Tiles.Tile({ 
					x: x*this.tileWidth, y: y*this.tileHeight, width: this.tileWidth, height: this.tileHeight
				}));
				this.setConnection(el, [0,1,2,3], Game.Tiles.Type.Dirt);
			}
		}
	},
	insert: function(tileX, tileY, type, ignoretype) {
		var el = this.elements[this.mapTileToIndex(tileX, tileY)];
		if (Game.Tiles.Type.equals(el.connections, type)) return; // same type ignore
		if (Game.Tiles.Type.find(el.connections, ignoretype)) return; // has ignoretype
		var adjacent = this.getAdjacent(tileX, tileY);
		if (type.base != null) {
			for (var i=0;i<adjacent.length;i++) {
				if (adjacent[i] == null) continue;
				var tile = this.mapCoordToTile(adjacent[i].x, adjacent[i].y);
				this.insert(tile.tileX, tile.tileY, type.base, type);
			}
		}
		this.setConnection(el, [0,1,2,3], type);
		if (adjacent[1-1] != null)
			this.setConnection(adjacent[1-1], [1], type);
		if (adjacent[2-1] != null)
			this.setConnection(adjacent[2-1], [0,1], type);
		if (adjacent[3-1] != null)
			this.setConnection(adjacent[3-1], [0], type);
		if (adjacent[4-1] != null)
			this.setConnection(adjacent[4-1], [1,3], type);
		if (adjacent[6-1] != null)
			this.setConnection(adjacent[6-1], [0,2], type);
		if (adjacent[7-1] != null)
			this.setConnection(adjacent[7-1], [3], type);
		if (adjacent[8-1] != null)
			this.setConnection(adjacent[8-1], [2,3], type);
		if (adjacent[9-1] != null)
			this.setConnection(adjacent[9-1], [2], type);
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
	mapCoordToTile: function(x, y) { 
		if (x >= this.tileWidth*this.tilesWidth ||  y >= this.tileHeight*this.tilesHeight)
			return null;
		return {
			tileX: Math.floor(x / this.tileWidth),
			tileY: Math.floor(y / this.tileHeight)
		}
	},
	mapTileToIndex: function(tileX, tileY) {
		return tileY*this.tilesWidth+tileX;
	},
	getSprite: function(connections) {
		for (var i=0;i<this.selections.length;i++) {
			if (Game.Tiles.Type.equals(this.selections[i].connections, connections)) {
				var sourceX = this.selections[i].sourceX + (Math.floor(Math.random()*this.selections[i].length));
				var sourceY = this.selections[i].sourceY;
				while (sourceX >= 19) {
					sourceX=sourceX-19;
					sourceY+=1;
				}
				return new Framework.Sprite.Image({
					src: 'asset/Terrain/Summer.png',
					frames: [ { x: (32+1)*sourceX, y: (32+1)*sourceY, w: 32, h: 32 } ]
				});
			}
		}
		return null;
	},
	setConnection: function(tile, positions, type) {
		for (var i=0;i<positions.length;i++)
			tile.connections[positions[i]] = type;
		tile.sprite = this.getSprite(tile.connections) || new Framework.Sprite.Rectangle({ colour: '#F00', fill: true, radius:0 });
	}
});

Game.Tiles.Type = {
	Dirt: { id: 0 },
	Water: { id: 1 },
	Grass: { id: 2 },
	Shade: { id: 3 },
	equals: function(type1, type2) {
		if (type2 == null) return false;
		if (type1.length == undefined)
			return type1.id == type2.id;
		for (var i=0;i<type1.length;i++) {
			if (!Game.Tiles.Type.equals(type1[i], type2.length==undefined? type2: type2[i]))
				return false;
		}
		return true;
	},
	find: function (type1, type2) {
		for (var i=0;i<type1.length;i++) {
			if (Game.Tiles.Type.equals(type1[i], type2))
				return true;
		}
		return false;
	}
}
Game.Tiles.Type.Dirt.base = null;
Game.Tiles.Type.Water.base = Game.Tiles.Type.Dirt;
Game.Tiles.Type.Grass.base = Game.Tiles.Type.Dirt;
Game.Tiles.Type.Shade.base = Game.Tiles.Type.Dirt;

Game.Tiles.Tile = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.connections = [null, null, null, null];
		this.callSuper();
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.1, fill: true, radius: 18 });
	},
	draw: function() {
		this.callSuper();
		if (this.hovered)
			this.hoversprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
	}
});