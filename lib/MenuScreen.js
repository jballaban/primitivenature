Game.MenuScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.mouse = new Framework.Mouse(Framework.Cursors.Pointer);
		var menu = new Framework.Menu({
			vPosition: 'centered',
			hPosition: 'centered',
			y: -100,
			width: 150,
			height: 150,
			colour: '#000'
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
			Runtime.Screen = new Game.LoadScreen();
			document.documentElement.webkitRequestFullscreen();
		}
		menu.addElement(playmenu);
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
		menu.addElement(loadmenu);
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
		menu.addElement(mapeditmenu);
		this.addElement(0, menu);
		this.sprite = new Framework.Sprite.Image({ src:['asset/Menu/background.jpg'] });
	}
});