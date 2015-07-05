"use strict";
Global.loader.load(['lib/Framework/Framework.js','lib/Framework/Ajax.js','lib/Framework/Mapping/Tile.js','lib/Framework/Sprite.js'], function() {
	function getTileSetNameFromFileName(filename){
		return /([^\/\\]*)\.[^.]*$/.exec(filename)[1];
	}
	function tileArrayMixin(tiles,spec){
		tiles.getTile=function(){
			if(this.length === 0)
				return null;
			return this[Math.floor(Math.random()*this.length)];
		};
		tiles.specificity = spec;
		return tiles;
	}
	class Tileset {
		constructor(options) {
			options = options || {};
			this.loaded = false;
			this.sheet = null;
			this.tiles = null;
			this.transitionRegistry={};
			this.loadTilesetDefinition(options.definitionFile,options.definitionLoaded, options.tilesetLoaded);
		}

		//Assumes that no transition tile transitions from/to more then two tileslot types
		//Assumes that there is a transition tile for every possible combination of two tiles
		//If the transition tile transitions from tile type 1 to tile type 2 then the following 14 combinations must be defined
		//1112-1121-1122-1211-1212-1221-1222
		//2111-2112-2121-2122-2211-2212-2221
		loadTilesetDefinition(definitionFile,defcb,loadcb){
			Global.ajax.loadJSON(definitionFile,function(tilesetDefinition){
				var tilesetName,cTile,addUniqueToArray=function(arr,val){
					for(var x = 0; x < arr.length; x++){
						if(arr[x]===val)
							return;
					}
					arr.push(val);
				};
				this.loaded = true;
				this.tilesetName = getTileSetNameFromFileName(definitionFile);
				this.sheet = new Framework.Sprite.Image({src:tilesetDefinition.sheet.file,loaded:function(){
					if(loadcb)
						loadcb(this);
				}.bind(this)});
				this.sheet.tilesMeta=tilesetDefinition.sheet;
				this.tiles = [];
				this.slotCombinations = [];
				for(let i = 0; i < tilesetDefinition.tiles.length; i++){
					let tile = tilesetDefinition.tiles[i];
					for(let tsidx = 0; tsidx < tile.tilesheetIndexes.length; tsidx++){
						let otsidx = tile.tilesheetIndexes[tsidx];
						let bx=otsidx.x, by=otsidx.y;
						if(!otsidx.run)
							otsidx.run = 1;

						for(let r = 0; r < otsidx.run; r++){
							if(bx+r >= this.sheet.tilesMeta.tilesPerRow){
								bx = -r;
								by++;
							}
							cTile=new Framework.Mapping.Tile(this.tiles.length,this,bx+r,by,tile);
							this.tiles.push(cTile);
						}

						if(!cTile.isStructureTile() && cTile.tileSlotB !== null){
							if(!this.transitionRegistry.hasOwnProperty(cTile.tileSlotA))
								this.transitionRegistry[cTile.tileSlotA] = [];
							if(!this.transitionRegistry.hasOwnProperty(cTile.tileSlotB))
								this.transitionRegistry[cTile.tileSlotB] = [];
							addUniqueToArray(this.transitionRegistry[cTile.tileSlotA], cTile.tileSlotB);
							addUniqueToArray(this.transitionRegistry[cTile.tileSlotB], cTile.tileSlotA);
						}
					}
				}
				if(defcb)
					defcb(this);
			}.bind(this));
		}

		getTileByID(id){
			return this.tiles[id];
		}

		getMainTileByType(type,structureTile){
			var tile;
			if(type.constructor!==Array)
				type = [type,type,type,type];
			tile = this.searchForTilesBySlotsHighestSpecificity(type,structureTile);
			if(tile.length > 0)
				tile = tile[0];
			else
				tile = null;
			return tile;
		}

		searchForTilesBySlotsHighestSpecificity(slots,structureTile){
			var ret = [],highSpec=0,tSpec;
			if(typeof(structureTile)==='undefined')
				structureTile = false;
			for(let x = 0; x < this.tiles.length; x++){
				if(this.tiles[x].isStructureTile()===structureTile){
					tSpec = this.tiles[x].getMatchSpecificity(slots);
					if(tSpec > highSpec){
						highSpec = tSpec;
						ret = [this.tiles[x]];
					}else if(tSpec > 0 && tSpec === highSpec){
						ret.push(this.tiles[x]);
					}
				}
			}
			return tileArrayMixin(ret,highSpec);
		}

		//Assumes there is only one shortest path between any two tile slot types
		getShortestTileSlotPath(a,b,maxDepth){
			var depth = -1, ret = null;
			var recSTSP = function(a,b,depth){
				var ret;
				if(a===b)
					return [a]
				if(!this.transitionRegistry.hasOwnProperty(a) || depth <= 0)
					return null;
				depth--;
				for(var k = 0; k < this.transitionRegistry[a].length; k++){
					ret = recSTSP(this.transitionRegistry[a][k],b,depth);
					if(ret !== null){
						ret.unshift(a);
						return ret;
					}
				}
				return null;
			}.bind(this);
			if(a === b)
				return [a];
			if(!this.transitionRegistry.hasOwnProperty(a))
				return [];
			while(++depth < maxDepth && ret === null){
				ret = recSTSP(a,b,depth);
				if(ret !== null)
					break;
			}
			if(ret === null){//There is no path between a and b
				console.log("ERROR: No tile type path between terrain types (" + a + ") and (" + b + ")")
				debugger;
			}
			return ret;
		}
		searchTiles(topSlotResults,rightSlotResults,bottomSlotResults,leftSoltResults,baseTerain){
			var unmatchedTile = false,
				ret=[];
			if(typeof(baseTerrain)==='undefined')
				baseTerrain = 0;
			for(var x=0; x<this.tiles.length; x++){
				if(this.tiles[x].baseTerrain === baseTerrain || this.tiles[x].baseTerrain !== -baseTerrain){
					if(this.tiles[x].matchesSlots(slots)){
						ret.push(this.tiles[x]);
					}else{
						unmatchedTile = true;
					}
				}
			}
		}
	}
	Framework.Mapping = Framework.Mapping || {};
	Framework.Mapping.Tileset = Tileset;
});