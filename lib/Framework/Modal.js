"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	Framework.Modal = (function() {
		class Modal extends Framework.Element {
			constructor(options) {
				options = options || {};
				options.sprite = new Framework.Sprite.Rectangle({colour:'#000', alpha:0.8});
				super(options);
			}

			mouseClick() {
				this.active = false;
				this.show = false;
				super.mouseClick();
			}

			reposition() {
				super.reposition();
				this.sprite.width = this.width;
				this.sprite.height = this.height;
			}
		}
		return Modal;
	}());
});