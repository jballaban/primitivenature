"use strict";
Global.loader.load(['lib/Framework/Element.js'], function() {
	Framework.Modal = (function() {
		class Modal extends Framework.Element {
			constructor(options) {
				options = options || {};
				options.sprite = new Framework.Sprite.Image({src:'asset/Menu/background.png' });
				super(options);
			}
		}
		return Modal;
	}());
});