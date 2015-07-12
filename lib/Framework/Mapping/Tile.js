"use strict";
Global.loader.load(['lib/Framework/Framework.js'], function() {
	function matchSlot(o,s){
		return getSlotMatchSpecificity(o,s) > 0;
	}
	function getSlotMatchSpecificity(o,s){
		//An exact match is worth 3 points
		//A negative match is worth 2 points
		//A null match is worth 1 point
		//No match is worth 0 points
		if(o === null || s === null)
			return 1;
		else if(o === s)
			return 3;
		else if ((o < 0 || s < 0) && o !== -s)
			return 2;
		return 0;
	}
	class Tile{
		constructor(tileID,tileset,sheetX,sheetY,options) {
			this.tileID = tileID;
			this.tileset = tileset;
			this.slots = options.slots;
			this.slotsHash = 0;
			this.tileSlotA = this.slots[0];
			this.tileSlotB = null;
			if(options.terrain)
				this.baseTerrain = options.terrain;
			else
				this.baseTerrain = 0;

			for(let x=0; x<4; x++){
				this.slotsHash += Math.pow(10,3-x) * this.slots[x];
				if(this.slots[x] !== this.tileSlotA)
				{
					this.tileSlotB = this.slots[x];
				}
			}
			if(this.tileSlotB !== null && this.tileSlotA > this.tileSlotB){
				var tmp = this.tileSlotA;
				this.tileSlotA = this.tileSlotB;
				this.tileSlotB = tmp;
			}
			this.sheetIndex = {"x":sheetX,"y":sheetY};
		}

		isStructureTile(){
			return this.baseTerrain !== 0;
		}
		matchesSlots(slots){
			return matchSlot(slots[0],this.slots[0]) && matchSlot(slots[1],this.slots[1]) && matchSlot(slots[2],this.slots[2]) && matchSlot(slots[3],this.slots[3]);
		}
		getMatchSpecificity(slots){
			return getSlotMatchSpecificity(slots[0],this.slots[0]) + getSlotMatchSpecificity(slots[1],this.slots[1]) + getSlotMatchSpecificity(slots[2],this.slots[2]) + getSlotMatchSpecificity(slots[3],this.slots[3]);
		}
		matchesTopOf(that){
			return that.slots[0] === this.slots[1] && that.slots[3] === this.slots[2];
		}
		matchesBottomOf(that){
			return that.matchesTopOf(this);
		}
		matchesLeftOf(that){
			return that.slots[3] === this.slots[0] && that.slots[2] === this.slots[1];
		}
		matchesRightOf(that){
			return that.matchesLeftOf(this);
		}

		createSpriteOfTile(){
			var ts = this.tileset.sheet.tilesMeta.tileSize, sprite,ctxt;
			sprite = new Framework.Sprite.Image({width:ts.x, height:ts.y});
			ctxt = sprite.getContext(true);
			this.drawTo(ctxt,0,0);
			return sprite;
		}
		drawTo(ctxt,dx,dy){
			var tm=this.tileset.sheet.tilesMeta;
			ctxt.drawImage(this.tileset.sheet.img,
				tm.firstTileOffset.x + (tm.tileToTileDistance.x * this.sheetIndex.x),
				tm.firstTileOffset.y + (tm.tileToTileDistance.y * this.sheetIndex.y),
				tm.tileSize.x,
				tm.tileSize.y,
				dx,
				dy,
				tm.tileSize.x,
				tm.tileSize.y);
		}
	}
	function MaxSpecificSlot(slotA, slotB){
		if(slotA === null)
			return slotB;
		if(slotB === null)
			return slotA;
		if(slotA < 0 && slotB >= 0 && slotB !== -slotA)
			return slotB;
		if(slotB < 0 && slotA >= 0 && slotA !== -slotB)
			return slotA;
		if(slotA >= 0 && slotA === slotB)
			return slotA;
		return 0;
	}
	function slotsToArray(slots){
		if(slots === null || slots.constructor !== Array){
			slots = [slots,slots,slots,slots];
		}
		return slots;
	}
	Tile.createFillerSlots = function(topSlots, bottomSlots, leftSlots, rightSlots, tiles, undefined){
		var ret;
		topSlots = slotsToArray(topSlots);
		bottomSlots = slotsToArray(bottomSlots);
		leftSlots = slotsToArray(leftSlots);
		rightSlots = slotsToArray(rightSlots);

		return [
			MaxSpecificSlot(topSlots[1],rightSlots[3]),
			MaxSpecificSlot(rightSlots[2], bottomSlots[0]),
			MaxSpecificSlot(bottomSlots[3], leftSlots[1]),
			MaxSpecificSlot(leftSlots[0], topSlots[2])
		];
	};
	Tile.slotsEqual = function(a,b){
		return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	};
	Framework.Mapping = Framework.Mapping || {};
	Framework.Mapping.Tile = Tile;
});