"use strict";
Global.loader.load(['lib/Framework/Screen.js', 'lib/Game/Tiles.js', 'lib/Framework/Menu.js', 'lib/Framework/Button.js', 'lib/Framework/Mouse.js','lib/Framework/Mapping/Map.js'], function() {
	Game.EditorScreen = (function() {
		class EditorMouse extends Framework.Mouse {
			constructor(options) {
				options = options || {};
				options.element = Framework.Cursors.Pointer;
				super(options);
				this.insertTile=Game.Tiles.Type.Ocean;
				this.lastTilePos={x:-1,y:-1};
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

			setInsertTile(type){
				this.insertTile = type;
			}

			insert() {
				var el = Runtime.screen.elementAt(this.x, this.y);
				if (el instanceof Framework.Mapping.Map) {
					let tilePos = el.mapPosToTilePos(this.x, this.y);
					if(tilePos.x !== this.lastTilePos.x || tilePos.y !== this.lastTilePos.y){
						this.lastTilePos = tilePos;
						el.replaceTerrainTile(tilePos.x, tilePos.y, this.insertTile);
					}
				}
			}
		}

		function editorScreen_MapLoaded(){
			function getSpriteOfType(self, type){
				return self.map.tileset.getMainTileByType(Game.Tiles.Type[type],false).createSpriteOfTile();
			}
			this.dirtmenu.icon = getSpriteOfType(this,'Dirt');
			this.mudmenu.icon = getSpriteOfType(this,'Mud');
			this.grassmenu.icon = getSpriteOfType(this,'Grass');
			this.longgrassmenu.icon = getSpriteOfType(this,'LongGrass');
			this.shallowsmenu.icon = getSpriteOfType(this,'Shallows');
			this.oceanmenu.icon = getSpriteOfType(this,'Ocean');
		}
		function editorScreen_GetRandomTerrainTileOfType(slots){
			if(slots.constructor !== Array)
				slots = [slots,slots,slots,slots];
			return this.map.tileset.searchForTilesBySlotsHighestSpecificity(slots).getTile();
		}

		class EditorScreen extends Framework.Screen {
			constructor(options) {
				options = options || {};
				options.mouse = new EditorMouse();
				super(options);

				this.map = new Framework.Mapping.Map({tileDefinitionFile:'asset/Terrain/Summer.json', tileCountHorizontal:64,tileCountVertical:64, cb:editorScreen_MapLoaded.bind(this)});
				this.addElement(this.map);

				var buttonwidth = 100;
				var menu = new Framework.Menu({
					vPosition: 'absolute',
					hPosition: 'absolute',
					x: window.innerWidth-(buttonwidth+5)*7-5,
					y: 0,
					width: (buttonwidth+5)*7+5,
					height: 40,
					colour: '#000'
				});
				let relativeX = 5;
				this.dirtmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX,
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Dirt'})
				});
				this.dirtmenu.mouseClick = function() {
					options.mouse.setInsertTile(Game.Tiles.Type.Dirt);
				};
				menu.addElement(this.dirtmenu);
				relativeX+=buttonwidth+5;
				this.mudmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX,
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Mud'})
				});
				this.mudmenu.mouseClick = function() {
					options.mouse.setInsertTile(Game.Tiles.Type.Mud);
				};
				menu.addElement(this.mudmenu);
				relativeX+=buttonwidth+5;
				this.grassmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX,
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Grass'})
				});
				this.grassmenu.mouseClick = function() {
					options.mouse.setInsertTile(Game.Tiles.Type.Grass);
				};
				menu.addElement(this.grassmenu);
				relativeX+=buttonwidth+5;
				this.longgrassmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX,
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font:'14pt Calibri', label:'L. Grass'})
				});
				this.longgrassmenu.mouseClick = function() {
					options.mouse.setInsertTile(Game.Tiles.Type.LongGrass);
				};
				menu.addElement(this.longgrassmenu);
				relativeX+=buttonwidth+5;
				this.shallowsmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX,
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Shallows'})
				});
				this.shallowsmenu.mouseClick = function() {
					options.mouse.setInsertTile(Game.Tiles.Type.Shallows);
				};
				menu.addElement(this.shallowsmenu);
				relativeX+=buttonwidth+5;
				this.oceanmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX,
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Ocean'})
				});
				this.oceanmenu.mouseClick = function() {
					options.mouse.setInsertTile(Game.Tiles.Type.Ocean);
				};
				menu.addElement(this.oceanmenu);
				relativeX+=buttonwidth+5;
				var exitmenu = new Framework.Button({
					vPosition: 'centered',
					hPosition: 'relative',
					x: relativeX, 
					width: buttonwidth,
					height: 30, 
					sprite: new Framework.Sprite.Rectangle({colour:'#eee'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					text: new Framework.Text({font: '14pt Calibri', label:'Exit'})
				});
				exitmenu.mouseClick = function() {
					Runtime.setScreen(new Game.MenuScreen());
				}
				menu.addElement(exitmenu);
				this.addElement(menu);
			}
		}
		return EditorScreen;
	})();
});