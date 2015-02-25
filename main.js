require.config({
	baseUrl: 'lib',
    paths: {
        jquery: 'ref/jquery-2.1.3.min',
    }
});

requirejs([
	'jquery', 
	'ref/joii.min',
	'ref/sprintf.min',
	'Game'
	], function() {}
);