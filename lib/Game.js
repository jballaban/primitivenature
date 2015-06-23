var Runtime = null;
var Game = {};
Global.loader.load(['lib/Framework/Runtime.js', 'lib/Game/EditorScreen.js', 'lib/Game/MenuScreen.js', 'lib/Game/LoadScreen.js', 'lib/Game/Settings.js'], function () {
	Game.Settings = new Game.Settings();
	Runtime = new Framework.Runtime();
	if (Runtime.getParameterByName('screen') == 'editor')
		Runtime.setScreen(new Game.EditorScreen());
	else if (Runtime.getParameterByName('screen') == 'menu')
		Runtime.setScreen(new Game.MenuScreen());
	else if (Runtime.getParameterByName('screen') == 'intro')
		Runtime.setScreen(new Game.IntroScreen());
	else if (Runtime.getParameterByName('screen') == 'play')
		Runtime.setScreen(new Game.PlayScreen());
	else
		Runtime.setScreen(new Game.LoadScreen());
	if (Runtime.getParameterByName('music') == 'on' || Game.Settings.playMusic)
		Runtime.playMusic();
	Runtime.start();
});