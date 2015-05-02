var Game = {
	now: null,
	dt: null,
	last: window.performance.now(),
	resize: function() {
		Runtime.Canvas.canvas.width = Runtime.Canvas.width = window.innerWidth;
		Runtime.Canvas.canvas.height = Runtime.Canvas.height = window.innerHeight;
	},
	setScreen: function(screen) {
		Runtime.Screen = screen;
		Framework.MouseHandler.reset(screen.mouse);
	},
	update: function (dt) {
		Runtime.Screen.update();
		Framework.MouseHandler.update(Runtime.Screen);
	},
	draw: function (dt) {
		Runtime.Screen.draw();
		Framework.MouseHandler.draw();
	},
	frame: function (b) {
		Framework.FPS.tickStart();
		Game.now = window.performance.now();
		Game.dt = Math.min(1, (Game.now - Game.last) / 1000);
		this.update(Game.dt);
		this.draw(Game.dt);
		Game.last = Game.now;
		Framework.FPS.tick();
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
    file('lib/EditorScreen.js')
    	.provides('Game.EditorScreen')
    	.requires('Framework.Screen', 'Framework.Sprite','Framework.Button');
}});

JS.require('Game.EditorScreen','Game.LoadScreen', 'Game.MenuScreen', function() {
	Runtime.Canvas = $('canvas').get(0).getContext("2d");
	Game.setScreen(new Game.EditorScreen);
	Game.resize();
	setInterval(function() { Game.frame(true); }, 10);
	$(window).resize(Game.resize);
});
