"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	class Screen extends Framework.Element {
		constructor() {
			super();
		}

		draw() {
			Runtime.canvas.clearRect(0, 0, this.width, this.height);
			super.draw();
		}
	}
	Framework.Screen = Screen;
	Global.loader.loaded('lib/Framework/Screen.js');
});