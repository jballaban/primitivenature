Game.Tiles = {};

Game.Tiles.Tile = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.callSuper();
		this.tileX = null;
		this.tileY = null;
		this.sourceX = null;
		this.sourceY = null;
		$.extend(this, options);
		if (this.tileX == null || this.tileY == null) {
			console.log('ERROR: Tile must be passed tileX and tileY');
		}
		if (this.sourceX == null || this.sourceY == null) {
			console.log('ERROR: Tile must be passed tileX and tileY');
		}
		this.sprite = new Framework.Sprite.Image({src: 'asset/Terrain/Summer.png', frames: [ { x: (this.width+1)*this.sourceX, y: (this.height+1)*this.sourceY, w: this.width, h: this.height } ] });
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.5, fill: true, radius: 18 });	
	},
	draw: function() {
		this.callSuper();
		if (this.hovered)
			this.hoversprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
	}
});

Game.Tiles.Ground = new JS.Class(Game.Tiles.Tile, {
	initialize: function(options) {
		options.sourceX = 11+(Math.floor(Math.random()*3));
		options.sourceY = 17;
		this.callSuper();		
	}
});

Game.Tiles.Grass = new JS.Class(Game.Tiles.Tile, {
	initialize: function(options) {
		options.sourceX = 14+(Math.floor(Math.random()*2));
		options.sourceY = 18;
		this.callSuper();
	}
});

Game.Tiles.GroundGrass = new JS.Class(Game.Tiles.Tile, {
	initialize: function(options) {
		options.sourceX = 14+(Math.floor(Math.random()*2));
		options.sourceY = 18;
		this.callSuper();
	}
});