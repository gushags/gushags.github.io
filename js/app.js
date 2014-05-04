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
	$("#portfolio").slideUp("slow", function() {
		$(this).load("ruan.html #portfolio > *", function() {
			$(this).slideDown("slow");
			$(window).scrollTop(0);
		});
	});
});


//Energyficient
$( "#energyficient" ).click(function() {
	$("#portfolio").slideUp("slow", function() {
		$(this).load("energy.html #portfolio > *", function() {
			$(this).slideDown("slow");
			$(window).scrollTop(0);
		});
	});
});

// DCA
$( "#dca" ).click(function() {
	$("#portfolio").slideUp("slow", function() {
		$(this).load("dca.html #portfolio > *", function() {
			$(this).slideDown("slow");
			$(window).scrollTop(0);
		});
	});
});

// ISU
$( "#isu" ).click(function() {
	$("#portfolio").slideUp("slow", function() {
		$(this).load("isu.html #portfolio > *", function() {
			$(this).slideDown("slow");
			$(window).scrollTop(0);
		});
	});
});
