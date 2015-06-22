"use strict";
Global.loader.load(['lib/Framework/Framework.js'], function() {
	Framework.Storage = (function() {
		class Storage {
			constructor(options) {
				
			}

			save(field, object) {
				window.localStorage.setItem(field, JSON.stringify(object));
			}

			load(field) {
				return JSON.parse(window.localStorage.getItem(field));
			}

			remove(field) {
				window.localStorange.removeItem(field);
			}

		}
		return Storage;
	})();
});