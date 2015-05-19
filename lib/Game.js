var Runtime = null;
var Game = {};
Global.loader.load(['lib/Framework/Runtime.js', 'lib/Game/EditorScreen.js', 'lib/Game/MenuScreen.js', 'lib/Game/LoadScreen.js'], function () {
	Runtime = new Framework.Runtime();
	if (Runtime.getParameterByName('screen') == 'editor')
		Runtime.setScreen(new Game.EditorScreen());
	else if (Runtime.getParameterByName('screen') == 'menu')
		Runtime.setScreen(new Game.MenuScreen());
	else
		Runtime.setScreen(new Game.LoadScreen());
	if (Runtime.getParameterByName('music') != 'off')
		Runtime.playMusic();
	Runtime.start();
});