// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


// Hiding and showing icons
$(document).ready(function(){
	var delay = setTimeout(function(){
	        $("#face").removeClass("hide-initial").addClass("fade-in");
			$("#twit").removeClass("hide-initial").addClass("fade-in");
	        $("#tagline").removeClass("hide-initial").addClass("fade-in");
			$("#icon-scroll-down").removeClass("hide-initial").addClass("fade-in");
			$("#nav-buttons").removeClass("hide-initial").addClass("fade-in");
	     }, 1000);
});

// StickyNavbar code
$(function () {
    $('.header').stickyNavbar({
    activeClass: "active",          // Class to be added to highlight nav elements
    //sectionSelector: "scrollto",   // Class of the section that is interconnected with nav links
    //animDuration: 1100,              // Duration of jQuery animation
    startAt: 0,                     // Stick the menu at XXXpx from the top of the this() (nav container)
    //easing: "jswing",               // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
    animateCSS: false,               // AnimateCSS effect on/off
    animateCSSRepeat: false,        // Repeat animation everytime user scrolls
    cssAnimation: "fadeInDown",     // AnimateCSS class that will be added to selector
    // jqueryEffects: true,           // jQuery animation on/off
    //jqueryAnim: "slideDown",        // jQuery animation type: fadeIn, show or slideDown
    selector: "a",                  // Selector to which activeClass will be added, either "a" or "li"
    mobile: false,                  // If false nav will not stick under 480px width of window
    mobileWidth: 1024,               // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due usability on mobile devices)
    zindex: 9999,                   // The zindex value to apply to the element: default 9999, other option is "auto"
    stickyModeClass: "sticky",      // Class that will be applied to 'this' in sticky mode
    unstickyModeClass: "unsticky"   // Class that will be applied to 'this' in non-sticky mode
  });
});


// Smooth scrolling with Velocity.js

$('#home-button').click(function(){
	$('#home-page')
	    .velocity("scroll", { duration: 1200, easing: "ease" });
});

$('#about-button').click(function(){
	$('#about-page')
	    .velocity("scroll", { duration: 1200, easing: "ease" });
});

$('#experience-button').click(function(){
	$('#experience-page')
	    .velocity("scroll", { duration: 1200, easing: "ease" });
});


$('#portfolio-button').click(function(){
	$('#portfolio-page')
	    .velocity("scroll", { duration: 1200, easing: "ease" });
});


$('#contact-button').click(function(){
	$('#contact-page')
	    .velocity("scroll", { duration: 1200, easing: "ease" });
});




// Toggle hidden small logo
$(window).scroll(function() {    
    var h = $(window).height() - $("#header").height();
	var scroll = $(window).scrollTop();

    if (scroll >= h) {
        $("#small-logo").addClass("show").removeClass("hide");
		$("#face-head").addClass("show").removeClass("hide");
		$("#twit-head").addClass("show").removeClass("hide");
    } else {
        $("#small-logo").addClass("hide").removeClass("show");
		$("#face-head").addClass("hide").removeClass("show");
		$("#twit-head").addClass("hide").removeClass("show");
		$("#header").css({'top':'95%'});
    }
});

// Lazy load images
$("div.lazy").lazyload({
    effect : "fadeIn"
});

    

// Outdoor slider
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

// Digital slider
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



// Only play videos if visible
var videos = document.getElementsByTagName("video"),
	fraction = 0.8;

function onScroll() {

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

var throttled = _.debounce(onScroll, 200);

$(window).scroll(throttled);
$(window).resize(throttled);

