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
		for (var y=0; i<this.tilesHeight; i++) {
			for (var x=0; x<this.tilesWidth; x++) {
				this.addElement(new Game.Tiles.Tile2({ 
					x: x*this.tileWidth, y: y*this.tileHeight, width: this.tileWidth, height: this.tileHeight,
					sprite: new Game.Tiles.Sprites.Ground();
				}));
			}
		}
	}
});

Game.Tiles.Tile2 = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.ground = [];
		for (var i=1;i<10;i++) {
			if (i==5) continue;
			this.ground.push(i);
		}
		this.grass = [];
		this.callSuper();
		this.sprite = this.getSprite(ground.join(''), grass.join(''));
		console.log(sprite);
	},
	getSprite: function(ground, grass) {
		var selection = [ //boundaries describe where ground is in relation to me
			{ ground: '12346789', grass: '', sourceX: 11+(Math.floor(Math.random()*3)), sourceY: 17 },
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
			if (selection[i].ground == ground && selection[i].grass == grass) {
				selected = selection[i];
				break;
			}
		}
		if (selected == null)
			return null;
		return new Framework.Sprite.Image({
			src: 'asset/Terrain/Summer.png',
			frames: [ { x: (32+1)*selected.sourceX, y: (32+1)*selected.sourceY, w: 32, h: 32 } ]
		};
	}
});

Game.Tiles.Sprites = {};

Game.Tiles.Sprites.Ground = );

Game.Tiles.Tile = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.callSuper();
		this.sourceX = null;
		this.sourceY = null;
		this.width = 32;
		this.height = 32;
		this.adjacent = [];
		for (var i=0;i<9;i++)
			this.adjacent.push(Game.Tiles.Ground);
		$.extend(this, options);
		if (this.sourceX == null || this.sourceY == null) {
			console.log('ERROR: Tile must be passed sourceX and sourceY', this, options);
		}
		this.sprite = new Framework.Sprite.Image({src: 'asset/Terrain/Summer.png', frames: [ { x: (this.width+1)*this.sourceX, y: (this.height+1)*this.sourceY, w: this.width, h: this.height } ] });
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.1, fill: true, radius: 18 });	
	},
	draw: function() {
		this.callSuper();
		if (this.hovered)
			this.hoversprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
	},
	blend: function(adjacent) {
		var ground = [];
		var grass = [];
		for (var i=1;i<10;i++) {
			if (adjacent[i-1] != null) {
				if (adjacent[i-1].ground)
					ground.push(parseInt(i));
				if (adjacent[i-1].grass)
					grass.push(parseInt(i));
			}
		}
		var source = Game.Tiles.GrassGround.getSource(ground, grass);
		console.log(ground, grass, source)
		if (source == null)
			return null;
		return new Game.Tiles.GrassGround({ sourceX: source.sourceX, sourceY: source.sourceY });
	}
});

Game.Tiles.Ground = new JS.Class(Game.Tiles.Tile, {
	initialize: function(options) {
		options = options || {};
		options.sourceX = 11+(Math.floor(Math.random()*3));
		options.sourceY = 17;
		this.callSuper(options);
		this.ground = true;
	}
});

Game.Tiles.Grass = new JS.Class(Game.Tiles.Tile, {
	initialize: function(options) {
		options = options || {};
		options.sourceX = 14+(Math.floor(Math.random()*2));
		options.sourceY = 18;
		this.callSuper(options);
		this.grass = true;
	}
});

Game.Tiles.GrassGround = new JS.Class(Game.Tiles.Tile, {
	extend: {
		getSource: function(ground, grass) {
			grass = grass.join('');
			ground = ground.join('');
			var selection = [ //boundaries describe where ground is in relation to me
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
				if (selection[i].grass == grass) {
					selected = selection[i];
					break;
				}
			}
			if (selected != null)
				return selected;
			return null;
		}
	},
	initialize: function(options) {
		this.ground = true;
		this.grass = true;
		this.callSuper();
	}
});