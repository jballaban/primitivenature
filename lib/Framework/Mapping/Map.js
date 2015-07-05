"use strict";
Global.loader.load(['lib/Framework/Framework.js','lib/Framework/Element.js','lib/Framework/Mapping/Tileset.js','lib/Framework/Sprite.js'],function(){
	var GOD_TILESLOT = {length:99999};

	var TransitionSpiralOut = function(dropX, dropY, xLen, yLen){
		this.cells = 4;
		this.totalCells = xLen*yLen;
		this.segStart = {x:dropX, y:dropY-1};
		this.segPos = -1;
		this.segLen = 3;
		this.segDir = {x:1,y:0};
		this.spiral = 0;

		this.rotateSegment=function(){
			this.segStart.x = this.segStart.x + ((this.segLen-1) * this.segDir.x);
			this.segStart.y = this.segStart.y + ((this.segLen-1) * this.segDir.y);
			this.segPos = 0;
			if(this.segDir.y !== 0){
				this.segDir.x = -this.segDir.y;
				this.segDir.y = 0;
				if(this.segDir.x === 1){
					this.segStart.y--;
					this.segStart.x--;
					this.segLen+=2;
					this.spiral++;
				}
			}else{
				this.segDir.y = this.segDir.x;
				this.segDir.x = 0;
			}
			this.segStart.x += this.segDir.x;
			this.segStart.y += this.segDir.y;
		};
		this.getNextCell=function(){
			var ret={x:0,y:0}, xl = xLen, yl = yLen;
			if(this.cells >= this.totalCells)
				return null;
			this.cells++;
			do{
				if(this.segPos >= this.segLen-1){
					this.rotateSegment();
				}else{
					this.segPos++;
				}
				ret.x = this.segStart.x + (this.segPos * this.segDir.x);
				ret.y = this.segStart.y + (this.segPos * this.segDir.y);
			}while(ret.x < 0 || ret.x >= xl || ret.y < 0 || ret.y >=yl);
			return ret;
		};
		this.isCornerPiece=function(){
			return this.segPos === this.segLen;
		};
	};

	//Transition maps are equivalent to regular maps but store only a single value that discerns what each corner will contain (rather then 4 separate but equal values)
	//This function expects the only parameter to be a map to be copied into a full transition map
	//-OR-
	//The first two parameters to be a width and height for an empty transition map, and a third parameter for the tileset
	var createTransitionMap = function(width,height,tileset){
		var map = null, ret = [];
		if(typeof(width) === 'object'){
			map = width;
			width = map.tileCountHorizontal;
			height = map.tileCountVertical;
			tileset = map.tileset;
		}
		for(var x = 0; x < width + 1; x++){
			var cCol = [];
			for(var y = 0; y < height + 1; y++){
				var cVal = null;
				if(map !== null){
					if(x < width && y < height)
						cVal = map.getTileSlotData(x,y)[3];
					else if(x < width)
						cVal = map.getTileSlotData(x,y-1)[2];
					else if(y < height)
						cVal = map.getTileSlotData(x-1,y)[0];
					else
						cVal = map.getTileSlotData(x-1,y-1)[1];
				}
				cCol.push(cVal);
			}
			ret.push(cCol);
		}
		var transitionMapArrayMixin=function(arr){
			arr.setSlots=function(slots,x,y){
				this[x][y]=slots[3];
				this[x+1][y]=slots[0];
				this[x][y+1]=slots[2];
				this[x+1][y+1]=slots[1];
			};
			arr.getSlotTypes=function(x,y){
				var ret={typeA:this[x][y],typeB:null},tmp;
				if(this[x+1][y] !== ret.typeA){
					ret.typeB = this[x+1][y];
				}else if(this[x][y+1] !== ret.typeA){
					ret.typeB = this[x][y+1];
				}else if(this[x+1][y+1] !== ret.typeA){
					ret.typeB = this[x+1][y+1];
				}
				if(ret.typeB !== null && ret.typeA > ret.typeB){
					tmp = ret.typeA;
					ret.typeA = ret.typeB;
					ret.typeB = tmp;
				}
				return ret;
			};
			//Blends a transition map based on a base transition map
			//Returns true if a tile was changed
			//Returns false if the tile is now a GOD_TILESLOT
			arr.blendAdjacentTransitionsTowards=function(x,y,baseTransMap,tileset){
				var shortPaths=[],
					self=this,
					pushRealVal=function(x,y){ //Push value from transitionMap to shortPaths if value is not null AND convert GOD_TILESLOT to base transition type value
						if(self[x][y] === GOD_TILESLOT)
							shortPaths.push(baseTransMap[x][y])
						else if(self[x][y] !== null)
							shortPaths.push(self[x][y]);
					},
					longestOfShortPaths=[];
				//Gather neighbour tile types
				if(x>0){
					if(y>0)
						pushRealVal(x-1,y-1);
					pushRealVal(x-1,y);
					if(y<this[0].length-1)
						pushRealVal(x-1,y+1);
				}
				if(y>0)
					pushRealVal(x,y-1);
				if(y<this[0].length-1)
					pushRealVal(x,y+1);
				if(x<this.length-1){
					if(y>0)
						pushRealVal(x+1,y-1);
					pushRealVal(x+1,y);
					if(y<this[0].length-1)
						pushRealVal(x+1,y+1);
				}
				//Map to getShortestTileSlotPath
				for(let i = 0; i < shortPaths.length;i++){
					shortPaths[i] = tileset.getShortestTileSlotPath(shortPaths[i],baseTransMap[x][y],50);
					if(shortPaths[i].length > longestOfShortPaths.length)
						longestOfShortPaths = shortPaths[i];
				}
				if(longestOfShortPaths.length === 0){
					console.log("ERROR: Could not blend transitional tile types!");
					debugger;
				}else if(longestOfShortPaths.length === 1){
					this[x][y] = GOD_TILESLOT;
					return false;
				}else{
					this[x][y] = longestOfShortPaths[1];
					return true;
				}
			};
			return arr;
		};
		return transitionMapArrayMixin(ret);
	};

	var replaceTileAndFlattenTerrain = function(map, newSlots, pos){
		var overlayTransitions = createTransitionMap(map.tileCountHorizontal,map.tileCountVertical),
			originalTransitions = createTransitionMap(map),
			spiralManager = new TransitionSpiralOut(pos.x,pos.y,map.width, map.height),
			cPos,expireSpiral = 1;
		overlayTransitions.setSlots(newSlots,pos.x,pos.y);
		while((cPos = spiralManager.getNextCell()) !== null){
			if(expireSpiral === spiralManager.spiral)
				break;
			if(overlayTransitions.blendAdjacentTransitionsTowards(cPos.x,cPos.y,originalTransitions,map.tileset))
				expireSpiral = spiralManager.spiral + 2;
		}

		for(let x = 0; x < overlayTransitions.length; x++){
			for(let y = 0; y< overlayTransitions[x].length;y++){
				var cTrans = overlayTransitions[x][y];
				if(cTrans!==null && cTrans !== GOD_TILESLOT){
					map.terrain[x][y] = map.tileset.searchForTilesBySlotsHighestSpecificity([
						overlayTransitions[x+1][y],
						overlayTransitions[x+1][y+1],
						overlayTransitions[x][y+1],
						overlayTransitions[x][y]
					],false).getTile();
				}
			}
		}

		map.invalidate();
	};

	class Map extends Framework.Element{
		constructor(options){
			options.width = 0; //Until tileset is loaded don't bother setting a real width and height
			options.height = 0;
			super(options);
			if(!options.tileDefinitionFile ||
					(!options.mapData && (
						(!options.tileCountHorizontal || options.tileCountHorizontal <= 0) || 
						(!options.tileCountVertical || options.tileCountVertical <= 0)
					))
				){
				console.log('Map constructor requires a tileDefinitionFile and also either a tilesCountHorizontal & tilesCountVertical or a mapData structure');
				debugger;
			}
			this.loaded = false;
			this.invalidated = true;
			this.terrain = [];
			this.structures = [];

			this.tileset = new Framework.Mapping.Tileset({'definitionFile':options.tileDefinitionFile,'tilesetLoaded':function(){
				this.loaded = true;
				if(options.mapData){
					//TODO: implement
				}else{
					this.tileCountHorizontal = options.tileCountHorizontal;
					this.tileCountVertical = options.tileCountVertical;
					this.tilesMeta = this.tileset.sheet.tilesMeta;
					this.width = this.tileCountHorizontal * this.tilesMeta.tileSize.x;
					this.height = this.tileCountVertical * this.tilesMeta.tileSize.y;
					this.img = new Framework.Sprite.Image({"width":this.width, "height":this.height});
					let o = this.tileset.searchForTilesBySlotsHighestSpecificity([1,1,1,1]); //Get ocean tiles
					if(o === null){
						console.log('Could not find ocean terrain tile!');
						debugger;
					}
					for(let x = 0; x<this.tileCountHorizontal; x++){
						this.terrain.push([]);
						this.structures.push([]);
						for(let y = 0; y<this.tileCountVertical; y++){
							this.terrain[x].push(o.getTile());
							this.structures[x].push(null);
						}
					}
				}
				if(options.cb){
					options.cb();
				}
			}.bind(this)});
		}

		getMapData(){
			//TODO: implement
			return null;
		}

		getTileSlotData(x,y){
			return this.terrain[x][y].slots;
		}

		mapPosToTilePos(x,y){
			return {x:Math.floor(x/this.tilesMeta.tileSize.x),y:Math.floor(y/this.tilesMeta.tileSize.y)};
		}

		replaceTerrainTile(x,y,tile){
			replaceTileAndFlattenTerrain(this,[tile,tile,tile,tile],{x:x,y:y});
		}
		replaceStructureTile(x,y,tile){
			this.structures[x,y] = tile;
		}
		localPointToTile(pt){
			var ret = {x:0, y:0}, ts=this.tilesMeta.tileSize;
			ret.x = Math.floor(pt.x / ts.x);
			ret.y = Math.floor(pt.y / ts.y);
			return ret;
		}

		invalidate(){
			this.invalidated=true;
		}

		draw(){
			if(!this.loaded)
				return;
			if(this.invalidated){
				let tileSize = this.tilesMeta.tileSize;
				let ctxt = this.img.getContext();
				for(let y = 0; y < this.tileCountVertical; y++){
					for(let x = 0; x < this.tileCountHorizontal; x++){
						this.terrain[x][y].drawTo(ctxt,tileSize.x * x, tileSize.y * y);
					}
				}
				this.img.releaseContext(ctxt);
				this.invalidated = false;
			}
			Runtime.canvas.drawImage(this.img.img,0,0);
		}
	}
	Framework.Mapping = Framework.Mapping || {};
	Framework.Mapping.Map = Map;
});