Game.MenuScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
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
			text: new Framework.Text('14pt Calibri', 'Play')
		});
		playmenu.mouseClick = function() {
			Game.setScreen(new Game.LoadScreen());
			document.documentElement.webkitRequestFullscreen();
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
			text: new Framework.Text('14pt Calibri', 'Load')
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
			text: new Framework.Text('14pt Calibri', 'Map Edit')
		});
		mapeditmenu.mouseClick = function() {
			Game.setScreen(new Game.EditorScreen());
		}
		this.menu.addElement(mapeditmenu);
		this.addElement(this.menu);
		this.sprite = new Framework.Sprite.Image({ src:'asset/background.jpg', alpha: 0 });
	},
	update: function() {
		if (this.loading=='background')
			this.sprite.alpha+=.003;
		if (this.loading=='background' && this.sprite.alpha >= 1)  {
			this.loading = '';
			this.menu.show = true;
		}
		this.callSuper();
	}
});