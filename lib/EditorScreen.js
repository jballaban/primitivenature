Game.EditorScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.tileset = new Game.Tiles.Summer({ tilesWidth: 20, tilesHeight: 20 });
		this.addElement(this.tileset);
		this.mouse = new Game.EditorScreen.Mouse();
		this.insertTile = Game.Tiles.Type.Water;
		var menu = new Framework.Menu({
			vPosition: 'absolute',
			hPosition: 'absolute',
			x: window.innerWidth-480,
			y: 0,
			width: 495,
			height: 40,
			colour: '#000'
		});
		var exitmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 385, 
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
			x: 290,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Ground')
		});
		groundmenu.mouseClick = function() {
			Runtime.Screen.insertTile = Game.Tiles.Type.Dirt;
		}
		menu.addElement(groundmenu);
		var grassmenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 195,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Grass')
		});
		grassmenu.mouseClick = function() {
			Runtime.Screen.insertTile = Game.Tiles.Type.Grass;
		}
		menu.addElement(grassmenu);
		var watermenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 100,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Water')
		});
		watermenu.mouseClick = function() {
			Runtime.Screen.insertTile = Game.Tiles.Type.Water;
		}
		menu.addElement(watermenu);
		var shademenu = new Framework.Button({
			vPosition: 'centered',
			hPosition: 'relative',
			x: 5,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Shade')
		});
		shademenu.mouseClick = function() {
			Runtime.Screen.insertTile = Game.Tiles.Type.Shade;
		}
		menu.addElement(shademenu);
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
		if (tilePos != null)
			Runtime.Screen.tileset.insert(tilePos.tileX, tilePos.tileY, Runtime.Screen.insertTile);
	}
});