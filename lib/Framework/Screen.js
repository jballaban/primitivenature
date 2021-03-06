"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	Framework.Screen = (function() {
		class Screen extends Framework.Element {
			draw(a) {
				Runtime.canvas.clearRect(0, 0, this.width, this.height);
				super.draw(a);
			}
		}
		return Screen;
	}());
});