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
function setValue()
{
    window.keyColor = 'home';
}

var color = function(id) {
	for ( var i = 0; i < colors.length; i++ )
	{
        if ( $(id).hasClass( colors[i] ) )
      {
        window.keyColor = colors[i];
        return window.keyColor;
      }
	}
};



var assignColor = function(newCol) {
	$( "#page" ).removeClass(window.keyColor);
	$( "#page" ).addClass(newCol);
	$(document.body).removeClass(window.keyColor);
	$(document.body).addClass(newCol);
	$( "#container" ).removeClass(window.keyColor);
	$( "#container" ).addClass(newCol);
};

// RUAN
$( "#ruan" ).click(function() {
	alert(color("#page"));
	newColor = "ruan-color";
	$( "#portfolio" ).load("ruan.html #portfolio > *");
	if (color( "#page" ) != "ruan-color") {
		assignColor(newColor, "#page");
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
	if (color( "#page" ) != "isu-color") {
		assignColor(newColor, "#page");
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
	if (color( "#page" ) != "energy-color") {
		assignColor(newColor, "#page");
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
	if (color( "#page" ) != "dca-color") {
		assignColor(newColor, "#page");
        $(window).scrollTop(0);
	}
    else {
        $(window).scrollTop(0);
    }
});

