Game.Tiles = {};

Game.Tiles.Ground = new JS.Class(Framework.Element, {
	initialize: function(options) {
		this.callSuper();
		if (Math.random() > 0.1) { // basic ground
			this.tileX = (11+(Math.floor(Math.random()*3)));
			this.tileY = 17;
		} else { 
			this.tileX = (14+(Math.floor(Math.random()*5)));
			this.tileY = 17;
		}
		this.sprite = new Framework.Sprite.Image({src: 'asset/Terrain/Summer.png', frames: [ { x: (this.width+1)*this.tileX, y: (this.height+1)*this.tileY, w: this.width, h: this.height } ] });
		this.hoversprite = new Framework.Sprite.Rectangle({ colour: '#FF0',  alpha:0.5, fill: true, radius: 18 })
		$.extend(this, options);
	},
	draw: function() {
		this.callSuper();
		if (this.hovered)
			this.hoversprite.draw(this.calculatedX, this.calculatedY, this.width, this.height);
	}
});