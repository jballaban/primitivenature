Game.MenuScreen = new JS.Class(Framework.Screen, {
	initialize : function() {
		this.callSuper();
		var menu = new Framework.Menu();
		menu.vPosition = 'centered';
		menu.hPosition = 'centered';
		menu.width = 100;
		menu.addLayer('items');
		var playmenu = new Framework.Menu();
		playmenu.width = 90;
		playmenu.height = 20;
		playmenu.y = 5;
		playmenu.vPosition = 'relative';
		playmenu.hPosition = 'centered';
		playmenu.sprite.colour = '#F00';
		menu.addElement('items', playmenu);
		var exitmenu = new Framework.Menu();
		exitmenu.width = 90;
		exitmenu.height = 20;
		exitmenu.y = 35;
		exitmenu.vPosition = 'relative';
		exitmenu.hPosition = 'centered';
		exitmenu.sprite.colour = '#F00';
		menu.addElement('items', exitmenu);
		menu.height = 60;
		menu.sprite.colour = '#000';
		this.addLayer('items');
		this.addElement('items', menu);
		this.sprite.colour = '#005';
	}
});