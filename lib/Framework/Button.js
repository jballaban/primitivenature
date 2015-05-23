"use strict";
Global.loader.load(['lib/Framework/Element.js', 'lib/Framework/Text.js'], function() {
	Framework.Button = (function() {
		class Button extends Framework.Element {
			constructor(options) {
				super(options);
				this.hovercolour = options.hovercolour || null;
				this.text = options.text || null;
				this.colour = options.colour;
				this.sprite = options.sprite || new Framework.Sprite.Rectangle();
				this.icon = options.icon;
			}

			update() {
				this.sprite.colour = this.hovered && this.hovercolour ? this.hovercolour : this.colour;
				super.update();
			}

			draw(a) {
				super.draw(a);
				if (this.icon != null) {
					this.icon.draw(this.calculatedX+5, this.calculatedY+this.height/2-20/2, 20, 20, this.alpha*a);
				}
				if (this.text != null)
					this.text.draw(this.calculatedX+5+(this.icon == null ? 0 : 25), this.calculatedY+5+this.height/2, this.width-10, this.alpha*a);
			}
		}
		return Button;
	})();
});