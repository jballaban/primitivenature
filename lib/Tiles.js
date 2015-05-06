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
		if (type == 'grass') {
			var el = this.elements[this.mapTileToIndex(tileX, tileY)];
			//el.ground = '';
			el.grass = [1,2,3,4,6,7,8,9];
			el.dirty = true;
			var adjacent = this.getAdjacent(tileX, tileY);
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
				if (adjacent[i].grass == [1,2,3,4,6,7,8,9]) continue;
				if (9-i==1)
					adjacent[i].grass.push(1,2,4);
				else if (9-i == 2)
					adjacent[i].grass.push(1,2,3,4,6);
				else if (9-i == 3)
					adjacent[i].grass.push(2,3,6);
				else if (9-i == 4)
					adjacent[i].grass.push(1,4,7,2,8);
				else if (9-i==6)
					adjacent[i].grass.push(2,3,6,8,9);
				else if (9-i==7)
					adjacent[i].grass.push(4,7,8);
				else if (9-i== 8)
					adjacent[i].grass.push(4,6,7,8,9);
				else if (9-i==9)
					adjacent[i].grass.push(6,8,9);
				adjacent[i].grass.sort();
				var uniquegrass = [];
				$.each(adjacent[i].grass, function(i, item){
				    if($.inArray(item, uniquegrass) === -1) uniquegrass.push(item);
				});
				adjacent[i].grass = uniquegrass;
				if (adjacent[i].grass == '12346789') {
					var tilePos = this.mapCoordToTile(adjacent[i].x, adjacent[i].y);
					this.insert(tilePos.tileX, tilePos.tileY, 'grass');
				} else {
					adjacent[i].dirty = true;
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
		//this.ground = [1,2,3,4,6,7,8,9];
		this.grass = [];
		this.callSuper();
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.1, fill: true, radius: 18 });
		this.dirty = true;
	},
	update: function() {
		this.callSuper();
		if (this.dirty) {
			this.sprite = this.getSprite(this.ground, this.grass);
			this.dirty = false;
		}
	},
	getSprite: function(ground, grass) {
		var selection = [
			{ ground: '12346789', grass: '', sourceX: 11+(Math.floor(Math.random()*3)), sourceY: 17 },
			{ ground: '', grass: '12346789', sourceX: 14+(Math.floor(Math.random()*2)), sourceY: 18 },
			{ ground: '278', grass: '1234689', sourceX: 4+(Math.floor(Math.random()*2)), sourceY: 14 },
			{ ground: '689', grass: '1234678', sourceX: 6+(Math.floor(Math.random()*2)), sourceY: 14 },
			{ ground: '46789', grass: '12346', sourceX: 8+(Math.floor(Math.random()*3)), sourceY: 14 },
			{ ground: '124', grass: '2346789', sourceX: 11+(Math.floor(Math.random()*2)), sourceY: 14 },
			{ ground: '12478', grass: '23689', sourceX: 13+(Math.floor(Math.random()*3)), sourceY: 14 },
			{ ground: '124689', grass: '234678', sourceX: 16+(Math.floor(Math.random()*2)), sourceY: 14 },
			{ ground: '1246789', grass: '236', sourceX: 18+(Math.floor(Math.random()*1)), sourceY: 14 },
			{ ground: '236', grass: '1246789', sourceX: 0+(Math.floor(Math.random()*2)), sourceY: 15 },
			{ ground: '234678', grass: '124689', sourceX: 2+(Math.floor(Math.random()*2)), sourceY: 15 },
			{ ground: '23689', grass: '12478', sourceX: 4+(Math.floor(Math.random()*3)), sourceY: 15 },
			{ ground: '2346789', grass: '124', sourceX: 7+(Math.floor(Math.random()*1)), sourceY: 15 },
			{ ground: '12346', grass: '46789', sourceX: 8+(Math.floor(Math.random()*3)), sourceY: 15 },
			{ ground: '1234678', grass: '689', sourceX: 11+(Math.floor(Math.random()*2)), sourceY: 15 },
			{ ground: '1234689', grass: '478', sourceX: 13+(Math.floor(Math.random()*2)), sourceY: 15 }
		];
		var selected = null;
		for (var i=0;i<selection.length;i++) {
			if (selection[i].grass == grass.join('')) {
				selected = selection[i];
				break;
			}
		}
		if (selected == null)
			return null;
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