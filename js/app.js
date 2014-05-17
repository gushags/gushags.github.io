// Foundation initialized
$(document).foundation();


// Masonry


// var $container = $('#container');
// $container.imagesLoaded( function(){
// 	$container.masonry({
// 		itemSelector: '.box',
// 		isAnimated: !Modernizr.csstransitions,
// 		isFitWidth: true
// 	});	
// });


$( function() {

  var $container = $('#container').masonry({
    itemSelector: '.box',
    columnWidth: 190
  });
  
  $container.on( 'click', '.box-content', function() {
      $( this ).parent('.box').toggleClass('is-expanded');
      $container.masonry();
  });
    
  // reveal initial images
  $container.masonryImagesReveal( $('#images').find('.box') );
});

$.fn.masonryImagesReveal = function( $items ) {
  var msnry = this.data('masonry');
  var itemSelector = msnry.options.itemSelector;
  // hide by default
  $items.hide();
  // append to container
  this.append( $items );
  $items.imagesLoaded().progress( function( imgLoad, image ) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $( image.img ).parents( itemSelector );
    // un-hide item
   $item.show();
    // masonry does its thing
    msnry.appended( $item );
  });
  
  return this;
};


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


// Function that loads the correct portfolio page based on a click event
// Remember: new colors and portfolio pages must in the form
// page and page-color

$('.book').click(function(){
    var id = this.id;
	var newColor = id + "-color";
	
	// Commenting this out because I think I may want to 
	// have this event happen off of an expanded element instead
	
	// $( "#portfolio" ).load(id + ".html", function(){
// 		$(document).foundation('orbit').init;
// 	});
	if (color(document.body) != newColor) {
		assignColor(newColor);
        $(window).scrollTop(0);
	}
    else {
        $(window).scrollTop(0);
    }
}); 
