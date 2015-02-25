var Game = {};

define(['./Framework/Main'], function() {
	console.log(Framework)
	Game.Screen = new Framework.Screen();
	Game.Screen.setX(0).setY(0).setWidth(window.innerWidth).setHeight(window.innerHeight).setShow(true);
	Game.Screen.draw();
});