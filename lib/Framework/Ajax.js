"use strict";
Global.loader.load([],function(){
	class Ajax{
		load(filePath, cb){
			var xhr = new XMLHttpRequest();

			xhr.overrideMimeType('application/json');
			xhr.open('GET', Global.loader.getFullPath(filePath), true);
			xhr.onreadystatechange = function () {
				if(xhr.readyState===4 /*&& xhr.status==='200'*/){ //"file:///" protocol doesn't return 200 status codes...
					cb(xhr.responseText);
				}
			};
			//NOTE: Due to an unresolved bug in chrome this line will throw an error in chrome!
			//Workaround is to close ALL windows of chrome and if you allow background apps
			//close the chrome out from your system tray. Then run startgame.bat from the root
			//of this repo.
			xhr.send(null);
		}
		loadJSON(jsonFilePath,cb) {
			this.load(jsonFilePath,function(res){
				cb(JSON.parse(res));
			});
		}
	}

	Global.ajax = new Ajax();
});