Framework = {
	FPS: new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' })
};

JS.packages(function() { with(this) {
	file('lib/Framework/Sprite.js').provides('Framework.Sprite');
	file('lib/Framework/Element.js').provides('Framework.Element').requires('Framework.Sprite');
	file('lib/Framework/Screen.js').provides('Framework.Screen').requires('Framework.Element');
	file('lib/Framework/Menu.js').provides('Framework.Menu').requires('Framework.Element');
	file('lib/Framework/Mouse.js').provides('Framework.Mouse').requires('Framework.Element');
}});