define (['./Layers'], function() {
	Framework.IElement = Interface({});

	return Framework.Element = Class({ implements: Framework.IElement, uses: [ Framework.TPosition, Framework.TDrawable ] }, {
		'public boolean active' : null,
		'public object parent' : null,
		'public object layers' : null
	});
});