Game.EditorScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.tileset = new Game.Tiles.Tileset({ tileWidth:32, tileHeight:32, tilesWidth: 50, tilesHeight: 50});
		this.addElement(this.tileset);
		this.mouse = new Game.EditorScreen.Mouse();
		this.insertTile = 'water';
		var menu = new Framework.Menu({
			vPosition: 'absolute',
			hPosition: 'absolute',
			x: window.innerWidth-385,
			y: 0,
			width: 395,
			height: 40,
			colour: '#000'
		});
		var exitmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 290, 
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Exit')
		});
		exitmenu.mouseClick = function() {
			Game.setScreen(new Game.MenuScreen());
		}
		menu.addElement(exitmenu);
		var groundmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 195,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Ground')
		});
		groundmenu.mouseClick = function() {
			Runtime.Screen.insertTile = 'ground';
		}
		menu.addElement(groundmenu);
		var grassmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 100,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Grass')
		});
		grassmenu.mouseClick = function() {
			Runtime.Screen.insertTile = 'grass';
		}
		menu.addElement(grassmenu);
		var watermenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 5,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Water')
		});
		watermenu.mouseClick = function() {
			Runtime.Screen.insertTile = 'water';
		}
		menu.addElement(watermenu);
		this.addElement(menu);
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
		var tilePos = Runtime.Screen.tileset.mapCoordToTile(this.x, this.y);
		Runtime.Screen.tileset.insert(tilePos.tileX, tilePos.tileY, Runtime.Screen.insertTile);
	}
});