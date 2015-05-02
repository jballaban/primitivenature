Framework.Screen = new JS.Class({
	initialize : function() {
		this.layers = [];
		this.mouse = null;
		this.sprite = null;
	},
	elementAt: function(x, y) {
		for (var i=this.layers.length-1;i>=0;i--) {
			for (var el=this.layers[i].length-1;el>=0;el--) {
				var element = this.layers[i][el].elementAt(x,y);
				if (element != null)
					return element;
			}
		}
		return null;
	},
	addElement: function(layerIndex, element) {
		if (layerIndex >= this.layers.length) {
			for (var i=this.layers.length;i<=layerIndex;i++)
				this.layers.push([]);
		}
		this.layers[layerIndex].push(element);
	},
	update: function() {
		for (var i=0;i<this.layers.length;i++) {
			for (var el=0;el<this.layers[i].length;el++)
				this.layers[i][el].update();
		}
	},
	draw: function() {
		if (this.sprite == null)
			Runtime.Canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
		else
			this.sprite.draw(0, 0, window.innerWidth, window.innerHeight);
		if (this.sprite != null)
			this.sprite.draw(0,0);
		for (var i=0;i<this.layers.length;i++) {
			for (var el=0;el<this.layers[i].length;el++)
				this.layers[i][el].draw();
		}
	}
});