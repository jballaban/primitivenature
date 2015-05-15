"use strict";
Global.loader.load(['lib/Framework/Element.js', 'lib/Framework/Text.js'], function() {
	class Button extends Framework.Element {
		constructor(options) {
			super(options);
			this.hovercolour = options.hovercolour || null;
			this.text = options.text || null;
			this.colour = options.colour;
			this.sprite = options.sprite || new Framework.Sprite.Rectangle();
		}

		update() {
			this.sprite.colour = this.hovered && this.hovercolour ? this.hovercolour : this.colour;
			super.update();
		}

		draw(x, y, w, h) {
			super.draw(x, y, w, h);
			if (this.text != null)
				this.text.draw(x+5, y+5+this.height/2, this.width-10);
		}
	}
	Framework.Button = Button;
	Global.loader.loaded('lib/Framework/Button.js');
});