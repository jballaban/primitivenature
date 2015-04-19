var Game = {
	now: null,
	dt: null,
	last: window.performance.now()
};

var Runtime = {};

JS.packages(function() { with(this) {
    file('lib/MenuScreen.js')
    	.provides('Game.MenuScreen')
    	.requires('Framework.Screen', 'Framework.Menu', 'Framework.Mouse');
}});

JS.require('Game.MenuScreen', function() {
	var el = new Framework.Screen();
	var canvasElement = $("<canvas width='" + window.innerWidth+ "' height='" + window.innerHeight + "'></canvas");
	canvasElement.appendTo('body');
	Runtime.Canvas = canvasElement.get(0).getContext("2d");
	Runtime.Canvas.width = window.innerWidth;
	Runtime.Canvas.height = window.innerHeight;
	Runtime.Screen = new Game.MenuScreen();
	Runtime.Screen.width = window.innerWidth;
	Runtime.Screen.height = window.innerHeight;
	requestAnimationFrame(frame);
});

function update(dt) {
	
}

function draw(dt) {
	Runtime.Screen.draw();
	Framework.Mouse.draw();
}

function frame() {
	Framework.FPS.tickStart();
	Game.now = window.performance.now();
	Game.dt = Math.min(1, (Game.now - Game.last) / 1000);
	update(Game.dt);
	draw(Game.dt);
	Game.last = Game.now;
	requestAnimationFrame(frame);
	Framework.FPS.tick();
}