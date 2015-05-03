Game.EditorScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		this.addElement(new Game.World({ tilesWidth: 50, tilesHeight: 50}));
		var menu = new Framework.Menu({
			vPosition: 'absolute',
			hPosition: 'absolute',
			x: window.innerWidth-100,
			y: 0,
			width: 100,
			height: 40,
			colour: '#000'
		});
		var playmenu = new Framework.Button({
			vPosition: 'relative',
			hPosition: 'centered',
			y: 5,
			width: 90,
			height: 30, 
			colour: '#eee',
			hovercolour: '#ccc',
			text: new Framework.Text('14pt Calibri', 'Exit')
		});
		playmenu.mouseClick = function() {
			Game.setScreen(new Game.MenuScreen());
		}
		menu.addElement(playmenu);
		this.addElement(menu);
	}
});