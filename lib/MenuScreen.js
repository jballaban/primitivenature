Game.MenuScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		var menu = new Framework.Menu({
			vPosition: 'centered',
			hPosition: 'centered',
			y: -100,
			width: 150,
			height: 150,
			colour: '#000'
		});
		menu.addLayer('items');
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
		menu.addElement('items', playmenu);
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
		menu.addElement('items', loadmenu);
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
		menu.addElement('items', mapeditmenu);
		this.addLayer('items');
		this.addElement('items', menu);
		this.sprite = new Framework.Sprite(['asset/Menu/background.jpg']);
	}
});