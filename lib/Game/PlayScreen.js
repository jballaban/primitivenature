"use strict";
Global.loader.load(['lib/Framework/Screen.js', 'lib/Framework/Sprite.js', 'lib/Framework/Modal.js'], function(){
	Game.PlayScreen = (function() {
		class PlayScreen extends Framework.Screen{
			constructor(options){
				super(options);
				this.mouse = new Framework.Mouse({element:Framework.Cursors.Pointer });
				this.sprite = new Framework.Sprite.Image({src: 'asset/play/background.jpg'});
				this.minimap = new Framework.Element({
					x: 40,
					y: 80,
					width: 250,
					height: 250,
					sprite: new Framework.Sprite.Image({src: 'asset/play/mini.png'})	
				});
				this.play = new Framework.Element({
					x: 40+250+40,
					y: 40,
					sprite: new Framework.Sprite.Image({src: 'asset/play/interior.png'})					
				});
				this.menuModal = new Framework.Modal({
					active:false,
					show:false
				});
				let settings = this.menuModal.addElement(new Framework.Element({
					width:230,
					height:230,
					vPosition:'centered',
					hPosition:'centered',
					sprite: new Framework.Sprite.Image({src:'asset/Menu/background.png' })
				}));
				let menubtn = new Framework.Menu({
					vPosition: 'absolute',
					hPosition: 'absolute',
					y: 40,
					x: 40,
					width: 250,
					height: 40,
					colour: '#000',
					sprite: new Framework.Sprite.Rectangle({colour:'#ccc', alpha: 0.5}),
				});
				menubtn.addElement(new Framework.Button({
					vPosition: 'relative',
					hPosition: 'relative',
					y: 5,
					x: 5, 
					width: 240,
					height: 30, 
					text: new Framework.Text({font:'14pt Calibri', label:'Menu', halign:'centered', colour:'#ddd'}),
					click: function() {
						Runtime.screen.menuModal.show = Runtime.screen.menuModal.active = true;
					},
					sprite: new Framework.Sprite.Image({src:'asset/play/button.jpg'})
				}));
				this.addElement(menubtn);
				this.addElement(this.minimap);
				this.addElement(this.play);
				this.addElement(this.menuModal);
			}

			reposition() {
				super.reposition();
				this.menuModal.width = this.width;
				this.menuModal.height = this.height;
				this.play.width = this.width-40-250-40-40;
				this.play.height = this.height-40-40;
				this.menuModal.reposition();
			}

			update() {
				
			}
		}
		return PlayScreen;
	})();
});