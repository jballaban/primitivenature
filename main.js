require.config({
	baseUrl: 'lib',
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    }
});

requirejs([
	'jquery', 
	'ref/joii.min', 
	'Framework/Main'
	], function() {}
);