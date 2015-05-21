"use strict";
Global.loader.load(['lib/Framework/Screen.js', 'lib/Game/Tiles.js', 'lib/Framework/Menu.js', 'lib/Framework/Button.js', 'lib/Framework/Mouse.js'], function() {
	Game.EditorScreen = (function() {
		class EditorMouse extends Framework.Mouse {
			constructor(options) {
				options = options || {};
				options.element = Framework.Cursors.Pointer;
				super(options);
			}

			move(x, y) {
				super.move(x, y);
				if (this.leftButtonPressed)
					this.insert();
			}

			down() {
				super.down();
				this.insert();
			}

			insert() {
				if ((Runtime.screen.elementAt(this.x, this.y) instanceof Game.Tiles.Tile)) {
					let tilePos = Runtime.screen.tileset.mapCoordToTile(this.x, this.y);
					Runtime.screen.tileset.insert(tilePos.tileX, tilePos.tileY, Runtime.screen.insertTile);
				}
			}
		}

		class EditorScreen extends Framework.Screen {
			constructor(options) {
				options = options || {};
				options.mouse = new EditorMouse();
				super(options);
				this.tileset = new Game.Tiles.Summer({ tileWidth:32, tileHeight:32, tilesWidth: 50, tilesHeight: 50});
				this.insertTile = Game.Tiles.Type.Water;
				this.addElement(this.tileset);
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
					text: new Framework.Text({font: '14pt Calibri', label:'Exit' })
				});
				exitmenu.mouseClick = function() {
					Runtime.setScreen(new Game.MenuScreen());
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
					text: new Framework.Text({font:'14pt Calibri', label:'Dirt'})
				});
				groundmenu.mouseClick = function() {
					Runtime.screen.insertTile = Game.Tiles.Type.Dirt;
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
					text: new Framework.Text({font:'14pt Calibri', label:'Grass'})
				});
				grassmenu.mouseClick = function() {
					Runtime.screen.insertTile = Game.Tiles.Type.Grass;
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
					text: new Framework.Text({font:'14pt Calibri', label:'Water'})
				});
				watermenu.mouseClick = function() {
					Runtime.screen.insertTile = Game.Tiles.Type.Water;
				}
				menu.addElement(watermenu);
				this.addElement(menu);
			}

			insert(tileX, tileY) {

			}
		}
		return EditorScreen;
	})();
});