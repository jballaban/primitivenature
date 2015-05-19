"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	class Menu extends Framework.Element {
		constructor(options) {
			options = options || {}
			//options.mouse = new Framework.Mouse(Framework.Cursors.Pointer);
			options.sprite = new Framework.Sprite.Rectangle({colour:'#000', alpha:0.5});
			super(options);
		}
	}
	Framework.Menu = Menu;
});