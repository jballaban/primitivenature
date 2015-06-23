"use strict";
Global.loader.load(['lib/Game/EditorScreen.js','lib/Game/PlayScreen.js', 'lib/Framework/Menu.js','lib/Framework/Button.js','lib/Framework/Mouse.js','lib/Game/IntroScreen.js', 'lib/Framework/Modal.js'],function(){
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
					height: 200,
					colour: '#000',
					alpha: 0
				});
				this.menu.addElement(new Framework.Button({
					vPosition: 'relative',
					hPosition: 'centered',
					y: 5,
					width: 140,
					height: 40, 
					text: new Framework.Text({font:'14pt Calibri', label:'Intro'}),
					click: function() {
						Runtime.setScreen(new Game.IntroScreen());
					},
					sprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ac8'})
				}));
				this.menu.addElement(new Framework.Button({
					width: 140,
					height: 40,
					y: 55,
					vPosition: 'relative',
					hPosition: 'centered',
					sprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ac8'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Play'}),
					click: function() {
						Runtime.setScreen(new Game.PlayScreen());
					}
				}));
				this.menu.addElement(new Framework.Button({
					width: 140,
					height: 40,
					y: 105,
					vPosition: 'relative',
					hPosition: 'centered',
					sprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ac8'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Map Edit'}),
					click: function() {
						Runtime.setScreen(new Game.EditorScreen());
					}
				}));
				this.menu.addElement(new Framework.Button({
					width: 140,
					height: 40,
					y: 155,
					vPosition: 'relative',
					hPosition: 'centered',
					sprite: new Framework.Sprite.Rectangle({colour:'#ccc'}),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#ac8'}),
					text: new Framework.Text({font:'14pt Calibri', label:'Settings'}),
					click: function() {
						this.modal.active = true;
						this.modal.show = true;
					}.bind(this)
				}));
				this.addElement(this.menu);
				this.modal = new Framework.Modal({
					active:false,
					show:false
				});
				let settings = this.modal.addElement(new Framework.Element({
					width:230,
					height:230,
					vPosition:'centered',
					hPosition:'centered',
					sprite: new Framework.Sprite.Image({src:'asset/Menu/background.png' })
				}));
				settings.addElement(new Framework.Checkbox({
					width: 180,
					height: 40,
					y:20,
					sprite: new Framework.Sprite.Invisible(),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#fff', alpha:0.3}),
					vPosition: 'relative',
					hPosition: 'centered',
					checked: Game.Settings.playIntro, 
					text: new Framework.Text({font:'14pt Calibri', label:'Play Intro Video', hovercolour:'#F91' }),
					click: function() {
						Game.Settings.playIntro = this.checked;
					}
				}));
				settings.addElement(new Framework.Checkbox({
					width: 180,
					height: 40,
					y: 65,
					vPosition: 'relative',
					hPosition: 'centered',
					sprite: new Framework.Sprite.Invisible(),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#fff', alpha:0.3}),
					text: new Framework.Text({font:'14pt Calibri', label:'Fullscreen'}),
					checked: Game.Settings.fullscreen,
					click: function() {
						Game.Settings.fullscreen = this.checked;
					}
				}));
				settings.addElement(new Framework.Checkbox({
					width: 180,
					height: 40,
					y: 110,
					vPosition: 'relative',
					hPosition: 'centered',
					sprite: new Framework.Sprite.Invisible(),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#fff', alpha:0.3}),
					text: new Framework.Text({font:'14pt Calibri', label:'Play Music'}),
					checked: Game.Settings.playMusic,
					click: function() {
						Game.Settings.playMusic = this.checked;
					}
				}));
				settings.addElement(new Framework.Checkbox({
					width: 180,
					height: 40,
					y: 155,
					vPosition: 'relative',
					hPosition: 'centered',
					sprite: new Framework.Sprite.Invisible(),
					hoversprite: new Framework.Sprite.Rectangle({colour:'#fff', alpha:0.3}),
					text: new Framework.Text({font:'14pt Calibri', label:'Lock Mouse'}),
					checked: Game.Settings.lockMouse,
					click: function() {
						Game.Settings.lockMouse = this.checked;
					}
				}));
				this.addElement(this.modal);
				this.sprite = new Framework.Sprite.Image({ src:'asset/background.jpg', alpha: 0 });
			}

			reposition() {
				super.reposition();
				this.modal.width = this.width;
				this.modal.height = this.height;
				this.modal.reposition();
			}

			update() {
				if (this.loading=='background') {
					this.sprite.alpha+=.02;
					if (this.loading=='background' && this.sprite.alpha >= 1)
						this.loading = 'menu'
				}
				if (this.loading=='menu') {
					this.menu.alpha+=.05;
					if (this.loading == 'menu' && this.menu.alpha >=1)
						this.loading = '';
				}
				super.update();
			}
		}
		return MenuScreen;
	})();
});