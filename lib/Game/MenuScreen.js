"use strict";
Global.loader.load(['lib/Game/EditorScreen.js','lib/Framework/Menu.js','lib/Framework/Button.js','lib/Framework/Mouse.js'],function(){
	class MenuScreen extends Framework.Screen{
		constructor(options){
			super(options);
			this.mouse = new Framework.Mouse(Framework.Cursors.Pointer);
			this.loading = 'background';
			this.menu = new Framework.Menu({
				vPosition: 'centered',
				hPosition: 'centered',
				y: -100,
				width: 150,
				height: 150,
				colour: '#000',
				show: false
			});
			var playmenu = new Framework.Button({
				vPosition: 'relative',
				hPosition: 'centered',
				y: 5,
				width: 140,
				height: 40, 
				colour: '#eee',
				hovercolour: '#ccc',
				text: new Framework.Text({font:'14pt Calibri', label:'Play'})
			});
			playmenu.mouseClick = function() {
				Runtime.setScreen(new Game.LoadScreen());
				//document.documentElement.webkitRequestFullscreen();
			}
			this.menu.addElement(playmenu);
			var loadmenu = new Framework.Button({
				width: 140,
				height: 40,
				y: 55,
				vPosition: 'relative',
				hPosition: 'centered',
				colour: '#eee',
				hovercolour: '#ccc',
				text: new Framework.Text({font:'14pt Calibri', label:'Load'})
			});
			this.menu.addElement(loadmenu);
			var mapeditmenu = new Framework.Button({
				width: 140,
				height: 40,
				y: 105,
				vPosition: 'relative',
				hPosition: 'centered',
				colour: '#eee',
				hovercolour: '#ccc',
				text: new Framework.Text({font:'14pt Calibri', label:'Map Edit'})
			});
			mapeditmenu.mouseClick = function() {
				Runtime.setScreen(new Game.EditorScreen());
			}
			this.menu.addElement(mapeditmenu);
			this.addElement(this.menu);
			this.sprite = new Framework.Sprite.Image({ src:'asset/background.jpg', alpha: 0 });
		}
		update() {
			if (this.loading=='background')
				this.sprite.alpha+=.003;
			if (this.loading=='background' && this.sprite.alpha >= 1)  {
				this.loading = '';
				this.menu.show = true;
			}
			super.update();
		}
	}
	Game.MenuScreen = MenuScreen;
	Global.loader.loaded('lib/Game/MenuScreen.js');
});