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


// AJAX call to display portfolio page and change colors


var colors = ['home', 'ruan-color', 'energy-color', 'dca-color', 'isu-color'];


var color = function(id) {
	for ( var i = 0; i < colors.length; i++ )
	{
        if ( $(id).hasClass( colors[i] ) )
      {
        var keyColor = colors[i];
        return keyColor;
      }
	}
};



var assignColor = function(newCol) {
	var removeColor = color(document.body);
	$(document.body).removeClass(removeColor);
	$(document.body).addClass(newCol);
	$( "#container" ).removeClass(removeColor);
	$( "#container" ).addClass(newCol);
};

// RUAN
$( "#ruan" ).click(function() {
	newColor = "ruan-color";
	$( "#portfolio" ).load("ruan.html #portfolio > *");
	if (color(document.body) != "ruan-color") {
		assignColor(newColor);
        $(window).scrollTop(0);
	}
    else {
        $(window).scrollTop(0);
    }
});

// ISU
$( "#isu" ).click(function() {
    newColor = "isu-color";
	$( "#portfolio" ).load("isu.html #portfolio > *");
	if (color(document.body) != "isu-color") {
		assignColor(newColor);
        $(window).scrollTop(0);
	}
    else {
        $(window).scrollTop(0);
    }
});
	

//Energyficient
$( "#energyficient" ).click(function() {
	newColor = "energy-color";
	$( "#portfolio" ).load("energy.html #portfolio > *");
	if (color(document.body) != "energy-color") {
		assignColor(newColor);
        $(window).scrollTop(0);
	}
    else {
        $(window).scrollTop(0);
    }
});

// DCA
$( "#dca" ).click(function() {
	newColor = "dca-color";
	$( "#portfolio" ).load("dca.html #portfolio > *");
	if (color(document.body) != "dca-color") {
		assignColor(newColor);
        $(window).scrollTop(0);
	}
    else {
        $(window).scrollTop(0);
    }
});

