Framework.Math = { 
	intersects : function(pointx, pointy, x, y, width, height) { // returns true/false if points intersect
		return (pointx >= x && pointx <= x+width && pointy >=y && pointy <= y+height);
	}
}