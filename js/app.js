// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation({
"magellan-expedition": {
  fixed_top: 25, // top distance in pixels assigned to the fixed element on scroll
}
});

$(document).ready(function(){
	var delay = setTimeout(function(){
	        $("#face").removeClass("hide-initial").addClass("fade-in");
			$("#twit").removeClass("hide-initial").addClass("fade-in");
	        $("#tagline").removeClass("hide-initial").addClass("fade-in");
			$("#icon-scroll-down").removeClass("hide-initial").addClass("fade-in");
			$("#nav-buttons").removeClass("hide-initial").addClass("fade-in");
	     }, 2000);
});



// Waypoints js
$(document).ready(function(){
	$('#header').waypoint('sticky', {
		offset: 32,
	    handler: function(dir) {
			var stick = $('#header').hasClass('stuck');
			if (stick) {
				$('.sticky-wrapper').addClass('stuck');
				$('.sticky-wrapper').css({'top':'0'});
			} else {
				$('.sticky-wrapper').removeClass('stuck');
				$('.sticky-wrapper').css({'top':'95%'});
			}
	    }
	});
});


// Smooth scrolling to the various pages and highlighted nav
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 1000, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}


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
    }
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


window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);
