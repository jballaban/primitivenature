"use strict"

// Custom package manager
class Loader {
	constructor() {
		this.basePath = /^(.*\/)[^\/]*$/.exec(window.location.href)[1];
		this.loadEntries={};
	}

	getFullPath(relUrl){
		return this.basePath + relUrl;
	}

	// loads a set of urls and then calls callback once they are all loaded
	load(urls, callback) {
		var cScript = document.currentScript.src, loadEntry;

		for(let x = 0; x<urls.length; x++){
			urls[x] = this.getFullPath(urls[x]);
		}

		if(this.loadEntries.hasOwnProperty(cScript)){
			loadEntry = this.loadEntries[cScript];
		}else{
			this.loadEntries[cScript] = loadEntry = {loaded:false,executed:false, url:cScript, dependencies:{}};
		}
		loadEntry.callback=callback;


		// now lets request all the dependencies that have not been processed yet
		for (let i=0;i<urls.length;i++) {
			let cdep = urls[i];
			if(!this.loadEntries.hasOwnProperty(cdep)){
				//This creates a new loadEntry for the dependency and also adds that entry to the current loadEntry's dependencies property.
				loadEntry.dependencies[cdep]=this.loadEntries[cdep]={loaded:false,executed:false,url:urls[i],dependencies:{},callback:null};
				this.requestScript(this.loadEntries[cdep]);
			}else{
				loadEntry.dependencies[cdep] = this.loadEntries[cdep];
			}
		}

		this._callReadyModules();
	}

	requestScript(loadEntry){
		var head = document.getElementsByTagName('head')[0], el = document.createElement('script');
		el.type = 'text/javascript';
		head.appendChild(el);
		el.addEventListener('load',function () { Global.loader._scriptLoad(loadEntry); });
		el.src = loadEntry.url;
	}

	_scriptLoad(loadEntry){
		loadEntry.loaded=true;
		this._callReadyModules();
	}

	_callReadyModules(){
		var somethingLoaded;
		do{
			somethingLoaded = false;
			for(let leKey in this.loadEntries){
				if(!this.loadEntries.hasOwnProperty(leKey))
					continue;
				let le = this.loadEntries[leKey];
				if(!le.executed && le.loaded){
					let readyToExec = true;

					//Check if dependencies are all executed
					for(let depsLEKey in le.dependencies){
						if(!le.dependencies.hasOwnProperty(depsLEKey))
							continue;
						let depsLE = le.dependencies[depsLEKey];
						if(!depsLE.executed){
							readyToExec = false;
							break;
						}
					}

					if(readyToExec){
						if(le.callback!==null)
							le.callback();
						le.executed = true;
						somethingLoaded = true;
						break;
					}
				}
			}
		} while(somethingLoaded);
	}

	// DEPRECATED: Left in for legacy support temporarily.
	loaded(src) {
	}
}

var Global = {
	loader: new Loader()
}