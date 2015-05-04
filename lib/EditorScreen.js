Game.EditorScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.world = new Game.World({ tilesWidth: 50, tilesHeight: 50});
		this.addElement(this.world);
		this.drawTile = Game.Tiles.Grass;
		this.mouse = new Game.EditorScreen.Mouse();
		var menu = new Framework.Menu({
			vPosition: 'absolute',
			hPosition: 'absolute',
			x: window.innerWidth-195,
			y: 0,
			width: 195,
			height: 40,
			colour: '#000'
		});
		var playmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 100, 
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Exit')
		});
		playmenu.mouseClick = function() {
			Game.setScreen(new Game.MenuScreen());
		}
		menu.addElement(playmenu);
		var grassmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 5,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Grass')
		});
		grassmenu.mouseClick = function() {
			
		}
		menu.addElement(grassmenu);
		this.addElement(menu);
	},
	insert: function(tileX, tileY) {
		this.world.insert(tileX, tileY, this.drawTile);
	}
});


Game.EditorScreen.Mouse = new JS.Class(Framework.Mouse, {
	initialize: function() {
		this.callSuper(Framework.Cursors.Invisible);
	},
	move: function() {
		this.callSuper();
		if (this.leftButtonPressed) 
			this.insert();
	},
	down: function() {
		this.callSuper();
		this.insert();
	},
	insert: function() {
		var tilePos = Runtime.Screen.world.mapCoordToTile(this.x, this.y);
		Runtime.Screen.world.insert(tilePos.x, tilePos.y, Runtime.Screen.drawTile)
	}
});