"use strict";
Global.loader.load(['lib/Game/EditorScreen.js','lib/Framework/Menu.js','lib/Framework/Button.js','lib/Framework/Mouse.js','lib/Game/IntroScreen.js'],function(){
	Game.MenuScreen = (function() {
		class MenuScreen extends Framework.Screen{
			constructor(options){
				options = options || {};
				options.mouse = new Framework.Mouse({element:Framework.Cursors.Pointer});
				super(options);
				this.loading = 'background';
				this.menu = new Framework.Menu({
					vPosition: 'centered',
					hPosition: 'centered',
					y: -10,
					width: 150,
					height: 300,
					colour: '#000',
					alpha: 0
				});
				var intromenu = new Framework.Button({
					vPosition: 'relative',
					hPosition: 'centered',
					y: 5,
					width: 140,
					height: 40, 
					colour: '#eee',
					hovercolour: '#ccc',
					text: new Framework.Text({font:'14pt Calibri', label:'Intro'})
				});
				intromenu.mouseClick = function() {
					Runtime.setScreen(new Game.IntroScreen());
				}
				this.menu.addElement(intromenu);
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
				var fullscreenmenu = new Framework.Button({
					width: 140,
					height: 40,
					y: 155,
					vPosition: 'relative',
					hPosition: 'centered',
					colour: '#eee',
					hovercolour: '#ccc',
					text: new Framework.Text({font:'14pt Calibri', label:'Fullscreen'})
				});
				fullscreenmenu.mouseClick = function() {
					Runtime.setFullscreen();
				}
				this.menu.addElement(fullscreenmenu);
				var musicmenu = new Framework.Button({
					width: 140,
					height: 40,
					y: 205,
					vPosition: 'relative',
					hPosition: 'centered',
					colour: '#eee',
					hovercolour: '#ccc',
					text: new Framework.Text({font:'14pt Calibri', label:'Play Music'})
				});
				musicmenu.mouseClick = function() {
					Runtime.playMusic();
				}
				this.menu.addElement(musicmenu);
				var mouselockmenu = new Framework.Button({
					width: 140,
					height: 40,
					y: 255,
					vPosition: 'relative',
					hPosition: 'centered',
					colour: '#eee',
					hovercolour: '#ccc',
					text: new Framework.Text({font:'14pt Calibri', label:'Lock Mouse'})
				});
				mouselockmenu.mouseClick = function() {
					Framework.MouseHandler.setLock();
				}
				this.menu.addElement(mouselockmenu);
				this.addElement(this.menu);
				this.sprite = new Framework.Sprite.Image({ src:'asset/background.jpg', alpha: 0 });
			}
			update() {
				if (this.loading=='background')
					this.sprite.alpha+=.003;
				if (this.loading=='menu')
					this.menu.alpha+=.003;
				if (this.loading=='background' && this.sprite.alpha >= 1)
					this.loading = 'menu'
				if (this.loading == 'menu' && this.menu.alpha >=1)
					this.loading = '';
				super.update();
			}
		}
		return MenuScreen;
	})();
});