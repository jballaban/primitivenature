"use strict";
Global.loader.load(['lib/Framework/Element.js', 'lib/Framework/Text.js', 'lib/Framework/Sprite.js'], function() {
	Framework.Button = (function() {
		class Button extends Framework.Element {
			constructor(options) {
				super(options);
				this.text = options.text || null;
				this.colour = options.colour;
				this.sprite = options.sprite || new Framework.Sprite.Rectangle({color:this.colour});
				this.nonhoversprite = this.sprite;
				this.hoversprite = options.hoversprite;
				this.icon = options.icon;
				this.click = options.click;
			}

			update() {
				this.sprite = this.hovered && this.hoversprite ? this.hoversprite : this.nonhoversprite;
				super.update();
			}

			mouseClick() {
				if (this.click != null)
					this.click();
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

	Framework.Checkbox = (function() {
		class Checkbox extends Framework.Button {
			constructor(options) {
				options = options || {};
				super(options);
				this.icon_unchecked = new Framework.Sprite.Image({ src: 'asset/checkbox.png', frames: [ { x: 21, y:0, w:20, h:20 } ] });
				this.icon_checked = new Framework.Sprite.Image({ src: 'asset/checkbox.png', frames: [ { x: 0, y:0, w:20, h:20 } ] });
				this.checked = options.checked == null ? false : options.checked;
				this.setIcon();
			}

			setIcon() {
				this.icon = this.checked ? this.icon_checked : this.icon_unchecked;
			}

			mouseClick() {
				this.checked = !this.checked;
				this.setIcon();
				super.mouseClick();
			}
		}
		return Checkbox;
	})();
});