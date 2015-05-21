"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	Framework.Menu = (function() {
		class Menu extends Framework.Element {
			constructor(options) {
				options = options || {}
				options.mouse = new Framework.Mouse({element:Framework.Cursors.Pointer});
				options.sprite = new Framework.Sprite.Rectangle({colour:'#000', alpha:0.5});
				super(options);
			}
		}
		return Menu;
	})();
});