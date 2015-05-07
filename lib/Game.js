var Game = {
	now: null,
	dt: null,
	last: window.performance.now(),
	resize: function() {
		Runtime.Screen.width = Runtime.Canvas.canvas.width = Runtime.Canvas.width = window.innerWidth;
		Runtime.Screen.height = Runtime.Canvas.canvas.height = Runtime.Canvas.height = window.innerHeight;
	},
	setScreen: function(screen) {
		Runtime.Screen = screen;
		Runtime.Screen.width = window.innerWidth;
		Runtime.Screen.height = window.innerHeight;
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
    file('lib/EditorScreen.js').provides('Game.EditorScreen').requires('Framework.Screen', 'Game.Tiles', 'Framework.Menu');
    file('lib/Tiles.js').provides('Game.Tiles').requires('Framework.Element');
}});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

JS.require('Game.EditorScreen','Game.LoadScreen', 'Game.MenuScreen', function() {
	Runtime.Canvas = $('canvas').get(0).getContext("2d");
	if (getParameterByName('screen') == 'editor')
		Game.setScreen(new Game.EditorScreen());
	else
		Game.setScreen(new Game.LoadScreen());
	if (getParameterByName('music') == 'off')
		$('audio').get(0).pause();
	Game.resize();
	setInterval(function() { Game.frame(true); }, 0);
	$(window).resize(Game.resize);
});
