var Game = {
	now: null,
	dt: null,
	last: window.performance.now(),
	resize: function() {
		Runtime.Screen.width = Runtime.Canvas.canvas.width = Runtime.Canvas.width = window.innerWidth;
		Runtime.Screen.height = Runtime.Canvas.canvas.height = Runtime.Canvas.height = window.innerHeight;
	}
};

var Runtime = {};

JS.packages(function() { with(this) {
    file('lib/MenuScreen.js')
    	.provides('Game.MenuScreen')
    	.requires('Framework.Screen', 'Framework.Menu', 'Framework.Button', 'Framework.Mouse');
    file('lib/LoadScreen.js')
    	.provides('Game.LoadScreen')
    	.requires('Framework.Screen', 'Framework.Button');
}});

JS.require('Game.LoadScreen', 'Game.MenuScreen', function() {
	Runtime.Canvas = $('canvas').get(0).getContext("2d");
	Runtime.Screen = new Game.LoadScreen();
	Game.resize();
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

$(window).resize(Game.resize);