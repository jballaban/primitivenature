"use strict"

// Custom package manager
class Loader {
	constructor() {
		this.loading = []; // list of urls to load including a callback once loaded
		this.urls = []; // urls that have already been requested to avoid dups
	}

	// loads a set of urls and then calls callback once they are all loaded
	load(urls, callback) {
		// remove any urls already requested
		for (var i=0;i<urls.length;i++) {
			for (var j=0;j<this.urls.length;j++) {
				if (this.urls[j] == urls[i]) {
					urls.splice(i--,1);
					break;
				}
			}
		}
		this.loading.push({ urls, callback });
		// now lets request all the dependents we still need
		for (var i=0;i<urls.length;i++) {
			this.urls.push(urls[i]);
		    var head = document.getElementsByTagName('head')[0];
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = urls[i];
			// script.onload = function () { Global.loader.loaded(urls[i]) };
		    head.appendChild(script);
		}
	}

	// called after each src is loaded to pop the stack
	loaded(src) {
		console.log(src)
		for (var i=0;i<this.loading.length;i++) {
			// pop this url off any loading requests
			for (var j=0;j<this.loading[i].urls.length;j++) {
				if (this.loading[i].urls[j] == src) {
					this.loading[i].urls.splice(j,1);
					break;
				}
			}
			// if a set has no outstanding urls to load then call its callback and remove it from the loading queue
			if (this.loading[i].urls.length == 0) {
				var callback = this.loading[i].callback;
				this.loading.splice(i--,1);
				if (callback != null)
					callback();
			}
		}
		
	}
}

var Global = {
	loader: new Loader()
}

Global.loader.load(['lib/Framework/Element.js'], function () {
	
});