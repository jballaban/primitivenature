Game.Tiles = {};

Game.Tiles.Tileset = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.tileWidth = null;
		this.tileHeight = null;
		this.tilesWidth = null;
		this.tilesHeight = null;
		this.callSuper();
		if (this.tileWidth == null || this.tileHeight == null || this.tilesWidth == null || this.tilesHeight == null)
			console.log('tileWidth, tileHeight, tilesWidth and tilesHeight are required', this);
		for (var y=0; y<this.tilesHeight; y++) {
			for (var x=0; x<this.tilesWidth; x++) {
				this.addElement(new Game.Tiles.Tile({ 
					x: x*this.tileWidth, y: y*this.tileHeight, width: this.tileWidth, height: this.tileHeight
				}));
			}
		}
	},
	insert: function (tileX, tileY, type) {
		var el = this.elements[this.mapTileToIndex(tileX, tileY)];
		if (type == 'grass' && el['water'].length > 0) return;
		if (type == 'water' && el['grass'].length > 0) return;
		var adjacent = this.getAdjacent(tileX, tileY);
		for (var i=0;i<9;i++) {
			if (adjacent[i] == null) continue;
			if (type == 'grass' && adjacent[i]['water'].length > 0) return;
			if (type == 'water' && adjacent[i]['grass'].length > 0) return;
		}
		el.ground = [];
		el.grass = [];
		el.water = [];
		el[type] = [1,2,3,4,6,7,8,9];
		el.dirty = true;
		for (var i=0;i<9;i++) {
			if (adjacent[i] == null) continue;
			// remove ground
			/*
			var index = adjacent[i].ground.split('').indexOf(9-i);
			if (index > -1) {
				adjacent[i].ground = adjacent[i].ground.split('').splice(index, 1).join('');
				adjacent[i].dirty = true;
			}
			*/
			// add grass
			if (adjacent[i][type] == [1,2,3,4,6,7,8,9]) continue;
			if (type == 'water' && adjacent[i]['grass'].length > 0) continue;
			if (type == 'grass' && adjacent[i]['water'].length > 0) continue;
			var newitems = [];
			var removeitems = [];
			if (9-i==1) {
				newitems.push(1,2,4);
				removeitems.push(1);
			}
			else if (9-i == 2) {
				newitems.push(2,1,3,4,6);
				removeitems.push(1,2,3);
			}
			else if (9-i == 3) {
				newitems.push(3,2,6);
				removeitems.push(3);
			}
			else if (9-i == 4) {
				newitems.push(4,1,7,2,8);
				removeitems.push(1,4,7);
			}
			else if (9-i==6) {
				newitems.push(6,2,3,8,9);
				removeitems.push(3,6,9);
			}
			else if (9-i==7) {
				newitems.push(7,4,8);
				removeitems.push(7);
			}
			else if (9-i== 8) {
				newitems.push(8,4,6,7,9);
				removeitems.push(7,8,9);
			}
			else if (9-i==9) {
				newitems.push(9,6,8);
				removeitems.push(9);
			}
			if (type == 'ground') {
				for (var j=0;j<removeitems.length;j++) {
					var index = adjacent[i].grass.indexOf(removeitems[j]);
					if (index > -1)
						adjacent[i].grass.splice(index, 1);
					index = adjacent[i].water.indexOf(removeitems[j]);
					if (index > -1)
						adjacent[i].water.splice(index, 1);
				}
			}
			for (var j=0;j<newitems.length;j++)
				adjacent[i][type].push(newitems[j]);
			adjacent[i][type].sort();
			var uniquegrass = [];
			$.each(adjacent[i][type], function(i, item){
			    if($.inArray(item, uniquegrass) === -1) uniquegrass.push(item);
			});
			adjacent[i][type] = uniquegrass;
			if (adjacent[i][type] == '12346789') {
				var tilePos = this.mapCoordToTile(adjacent[i].x, adjacent[i].y);
				this.insert(tilePos.tileX, tilePos.tileY, type);
			} else {
				adjacent[i].dirty = true;
			}
			if (type == 'ground' && (i+1)%2==0 && adjacent[i] != null) {
				var sprite = adjacent[i].getSprite();
				if (sprite == null) {
					var tilePos = this.mapCoordToTile(adjacent[i].x, adjacent[i].y);
					this.insert(tilePos.tileX, tilePos.tileY, type);
				}
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

Game.Tiles.Tile = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.ground = [1,2,3,4,6,7,8,9];
		this.grass = [];
		this.water = [];
		this.callSuper();
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.1, fill: true, radius: 18 });
		this.dirty = true;
	},
	update: function() {
		this.callSuper();
		if (this.dirty) {
			this.sprite = this.getSprite();
			this.dirty = false;
		}
	},
	getSprite: function() {
		var selection = [
			// water
			{ ground: '', grass: '', water: '12346789', sourceX: 15, sourceY: 15, length: 24 },
			// waterground
			{ ground: '1234689', grass: '', water: '478', sourceX: 16, sourceY: 10, length: 2 },
			{ ground: '1234678', grass: '', water: '689', sourceX: 18, sourceY: 10, length: 2 },
			{ ground: '12346', grass: '', water: '46789', sourceX: 1, sourceY: 11, length: 3 },
			{ ground: '2346789', grass: '', water: '124', sourceX: 4, sourceY: 11, length: 2 },
			{ ground: '23689', grass: '', water: '12478', sourceX: 6, sourceY: 11, length: 3 },
			{ ground: '234678', grass: '', water: '124689', sourceX: 9, sourceY: 11, length: 1 },
			{ ground: '236', grass: '', water: '1246789', sourceX: 10, sourceY: 11, length: 2 },
			{ ground: '1246789', grass: '', water: '236', sourceX: 12, sourceY: 11, length: 2 },
			{ ground: '124689', grass: '', water: '234678', sourceX: 14, sourceY: 11, length: 1 },
			{ ground: '12478', grass: '', water: '23689', sourceX: 15, sourceY: 11, length: 3 },
			{ ground: '124', grass: '', water: '2346789', sourceX: 18, sourceY: 11, length: 2 },
			{ ground: '46789', grass: '', water: '12346', sourceX: 1, sourceY: 12, length: 3 },
			{ ground: '689', grass: '', water: '1234678', sourceX: 4, sourceY: 12, length: 2 },
			{ ground: '478', grass: '', water: '1234689', sourceX: 6, sourceY: 12, length: 2 },
			// ground
			{ ground: '12346789', grass: '', water: '', sourceX: 11, sourceY: 17, length: 3 },
			// grass
			{ ground: '', grass: '12346789', water: '', sourceX: 14, sourceY: 18, length:2 },
			// grassground
			{ ground: '278', grass: '1234689', water: '', sourceX: 4, sourceY: 14, length: 2 },
			{ ground: '689', grass: '1234678', water: '', sourceX: 6, sourceY: 14, length: 2 },
			{ ground: '46789', grass: '12346', water: '', sourceX: 8, sourceY: 14, length: 3 },
			{ ground: '124', grass: '2346789', water: '', sourceX: 11, sourceY: 14, length: 2 },
			{ ground: '12478', grass: '23689', water: '', sourceX: 13, sourceY: 14, length: 3 },
			{ ground: '124689', grass: '234678', water: '', sourceX: 16, sourceY: 14, length: 2 },
			{ ground: '1246789', grass: '236', water: '', sourceX: 18, sourceY: 14, length: 1 },
			{ ground: '236', grass: '1246789', water: '', sourceX: 0, sourceY: 15, length: 2 },
			{ ground: '234678', grass: '124689', water: '', sourceX: 2, sourceY: 15, length: 2 },
			{ ground: '23689', grass: '12478', water: '', sourceX: 4, sourceY: 15, length: 3 },
			{ ground: '2346789', grass: '124', water: '', sourceX: 7, sourceY: 15, length: 1 },
			{ ground: '12346', grass: '46789', water: '', sourceX: 8, sourceY: 15, length: 3 },
			{ ground: '1234678', grass: '689', water: '', sourceX: 11, sourceY: 15, length: 2 },
			{ ground: '1234689', grass: '478', water: '', sourceX: 13, sourceY: 15, length: 2 }
		];
		var selected = null;
		for (var i=0;i<selection.length;i++) {
			if (selection[i].grass == this.grass.join('') && selection[i].water == this.water.join('')) {
				selected = selection[i];
				break;
			}
		}
		if (selected == null)
			return null;
		selected.sourceX += (Math.floor(Math.random()*selected.length));
		while (selected.sourceX >= 19) {
			selected.sourceX=selected.sourceX-19;
			selected.sourceY+=1;
		}
		return new Framework.Sprite.Image({
			src: 'asset/Terrain/Summer.png',
			frames: [ { x: (32+1)*selected.sourceX, y: (32+1)*selected.sourceY, w: 32, h: 32 } ]
		});
	},
	draw: function() {
		this.callSuper();
		if (this.hovered)
			this.hoversprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
	}
});