define(['./TPosition'], function(tposition) {
	return Framework.TDrawable = $.extend({}, tposition, {
		'public boolean visible' : false,
		'public draw' : function() {
			console.log(this.getX());
		}
	});
});