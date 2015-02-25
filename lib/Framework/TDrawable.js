define(['./TPosition'], function(tposition) {
	return Framework.TDrawable = $.extend({}, tposition, {
		'public boolean show' : false,
		'public function draw' : function() {
			if (this.show) {
				console.log(sprintf('draw: (%s,%s)-(%s,%s) %s',this.x,this.y,this.width,this.height,this.relative?'relative':'absolute'));
			}
		}
	});
});