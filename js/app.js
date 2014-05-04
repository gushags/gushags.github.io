// Foundation initialized
$(document).foundation();


// Masonry


var $containter = $('#container');
$containter.imagesLoaded( function(){
	$containter.masonry({
		itemSelector: '.box',
		isAnimated: !Modernizr.csstransitions,
		isFitWidth: true
	});	
});


// AJAX call to display portfolio page

// RUAN
$( "#ruan" ).click(function() {
	$("#portfolio").load("ruan.html #portfolio > *",);
});
	

//Energyficient
$( "#energyficient" ).click(function() {
	$("#portfolio").load("energy.html #portfolio > *");
});

// DCA
$( "#dca" ).click(function() {
	$("#portfolio").load("dca.html #portfolio > *");
});

// ISU
$( "#isu" ).click(function() {
	$("#portfolio").load("isu.html #portfolio > *");
});
