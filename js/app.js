// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).ready(function(){
	var delay = setTimeout(function(){
	        $("#face").removeClass("hide-initial").addClass("fade-in");
			$("#twit").removeClass("hide-initial").addClass("fade-in");
	        $("#tagline").removeClass("hide-initial").addClass("fade-in");
			$("#icon-scroll-down").removeClass("hide-initial").addClass("fade-in");
			$("#nav-buttons").removeClass("hide-initial").addClass("fade-in");
	     }, 2000);
});

// StickyNavbar code
$(function () {
    $('.header').stickyNavbar({
    activeClass: "active",          // Class to be added to highlight nav elements
    sectionSelector: "scrollto",   // Class of the section that is interconnected with nav links
    animDuration: 350,              // Duration of jQuery animation
    startAt: 0,                     // Stick the menu at XXXpx from the top of the this() (nav container)
    easing: "linear",               // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
    animateCSS: false,               // AnimateCSS effect on/off
    animateCSSRepeat: false,        // Repeat animation everytime user scrolls
    cssAnimation: "fadeInDown",     // AnimateCSS class that will be added to selector
    jqueryEffects: false,           // jQuery animation on/off
    jqueryAnim: "slideDown",        // jQuery animation type: fadeIn, show or slideDown
    selector: "a",                  // Selector to which activeClass will be added, either "a" or "li"
    mobile: false,                  // If false nav will not stick under 480px width of window
    mobileWidth: 1024,               // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due usability on mobile devices)
    zindex: 9999,                   // The zindex value to apply to the element: default 9999, other option is "auto"
    stickyModeClass: "sticky",      // Class that will be applied to 'this' in sticky mode
    unstickyModeClass: "unsticky"   // Class that will be applied to 'this' in non-sticky mode
  });
});



// Toggle hidden small logo
$(window).scroll(function() {    
    var h = $(window).height() - $("#header").height();
	var scroll = $(window).scrollTop();

    if (scroll >= h) {
        $("#small-logo").addClass("show").removeClass("hide");
    } else {
        $("#small-logo").addClass("hide").removeClass("show");
    }
});


// Outdoor slider
$('img.outdoor-img').load(function() {
	var availWidthOut = $('.outdoor-img').outerWidth() -
	                  $('.outdoor-mask').outerWidth();
	new Dragdealer('outdoor-slider', {
	  horizontal: true,
	  vertical: false,
	  xPrecision: availWidthOut,
	  animationCallback: function(x, y) {
	    $('.outdoor-img').css('margin-left', -x * availWidthOut);
	  }
	});
});

// Digital slider
$('img.digital-img').load(function() {
	var availWidthDig = $('.digital-img').outerWidth() -
	                  $('.digital-mask').outerWidth();
	new Dragdealer('digital-slider', {
	  horizontal: true,
	  vertical: false,
	  xPrecision: availWidthDig,
	  animationCallback: function(x, y) {
	    $('.digital-img').css('margin-left', -x * availWidthDig);
	  }
	});
});

// TV slider
var availWidthTV = 2610 -
                  $('.tv-mask').outerWidth();
new Dragdealer('tv-slider', {
  horizontal: true,
  vertical: false,
  xPrecision: availWidthTV,
  animationCallback: function(x, y) {
    $('.tv-img').css('margin-left', -x * availWidthTV);
  }
});

// Print and Collateral slider

$('img.print-img').load(function() {
	var availWidthPrint = $('.print-img').outerWidth() -
	                  $('.print-mask').outerWidth();
	new Dragdealer('print-slider', {
	  horizontal: true,
	  vertical: false,
	  xPrecision: availWidthPrint,
	  animationCallback: function(x, y) {
	    $('.print-img').css('margin-left', -x * availWidthPrint);
	  }
	});
});

// Only play videos if visible
var videos = document.getElementsByTagName("video");
var fraction = 0.8;

function checkScroll() {

    for(var i = 0; i < videos.length; i++) {

        var video = videos[i];

        var y = video.offsetTop, h = video.offsetHeight,  
            b = y + h, //bottom
            visibleY;

            visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

            if (visibleY > fraction) {
                video.play();
            } else {
                video.pause();
            }

    }

}

// Set 100% height by Jquery
$(document).ready(function(){
	$('#home-page').css('height', $(window).height());

	    // Continuously set the height of the window when screen resizes
	    $(window).resize(function() {
	        var theHeight = $(window).height();
	        $('#home-page').css('height', theHeight);
	});
});

window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);

// When ready...
window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});