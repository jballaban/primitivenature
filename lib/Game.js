var Game = {
	now: null,
	dt: null,
	last: window.performance.now()
};

var Runtime = {};

JS.packages(function() { with(this) {
    file('lib/MenuScreen.js')
    	.provides('Game.MenuScreen')
    	.requires('Framework.Screen', 'Framework.Menu', 'Framework.Button', 'Framework.Mouse');
    file('lib/LoadScreen.js')
    	.provides('Game.LoadScreen')
    	.requires('Framework.Screen', 'Framework.Button');
    file('lib/EditorScreen.js')
    	.provides('Game.EditorScreen')
    	.requires('Framework.Screen', 'Framework.Sprite','Framework.Button');
}});

JS.require('Game.EditorScreen','Game.LoadScreen', 'Game.MenuScreen', function() {
	var canvasElement = $("<canvas width='" + window.innerWidth+ "' height='" + window.innerHeight + "'></canvas");
	canvasElement.appendTo('body');
	Runtime.Canvas = canvasElement.get(0).getContext("2d");
	Runtime.Canvas.width = window.innerWidth;
	Runtime.Canvas.height = window.innerHeight;
	Runtime.Screen = new Game.LoadScreen();
	setInterval(function() { frame(true); }, 10);
});

function update(dt) {
	Runtime.Screen.update();
	Framework.MouseHandler.update(Runtime.Screen);
}

function draw(dt) {
	Runtime.Screen.draw();
	Framework.MouseHandler.draw();
}

function frame(b) {
	Framework.FPS.tickStart();
	Game.now = window.performance.now();
	Game.dt = Math.min(1, (Game.now - Game.last) / 1000);
	update(Game.dt);
	draw(Game.dt);
	Game.last = Game.now;
	Framework.FPS.tick();
}