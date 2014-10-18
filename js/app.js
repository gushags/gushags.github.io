// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// jquery.stickynavbar.js
;
(function($, document) {

	'use strict';

	$.fn.stickyNavbar = function(prop) {

		// Set default values
		var options = $.extend({
			activeClass: "active", // Class to be added to highlight nav elements
			sectionSelector: "scrollto", // Class of the section that is interconnected with nav links
			animDuration: 350, // Duration of jQuery animation as well as jQuery scrolling duration
			startAt: 0, // Stick the menu at XXXpx from the top of the this() (nav container)
			easing: "jswing", // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
			animateCSS: true, // AnimateCSS effect on/off
			animateCSSRepeat: false, // Repeat animation everytime user scrolls
			cssAnimation: "fadeInDown", // AnimateCSS class that will be added to selector
			jqueryEffects: false, // jQuery animation on/off
			jqueryAnim: "slideDown", // jQuery animation type: fadeIn, show or slideDown
			selector: "a", // Selector to which activeClass will be added, either "a" or "li"
			mobile: false, // If false, nav will not stick under viewport width of 480px (default) or user defined mobileWidth
			mobileWidth: 480, // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due user usability on mobile)
			zindex: 9999, // The zindex value to apply to the element: default 9999, other option is "auto"
			stickyModeClass: "sticky", // Class that will be applied to 'this' in sticky mode
			unstickyModeClass: "unsticky" // Class that will be applied to 'this' in non-sticky mode
		}, prop),
			section = $('.' + options.sectionSelector);


		return this.each(function() {

			/* Cache variables */
			var $self = $(this),
				$selfPosition = $self.css("position"), // Initial position of this,
				$selfZindex = $self.css("zIndex"), // Z-index of this
				$selfScrollTop = $self.offset().top, // scrollTop position of this
				$topOffset = $self.css("top") === 'auto' ? 0 : $self.css("top"), // Top property of this: if not set = 0
				menuItems = options.selector === "a" ? $self.find('li a') : $self.find('li'), // Navigation lists or links
				menuItemsHref = $self.find('li a[href*=#]'), // href attributes of navigation links
				thisHeight = $self.outerHeight(true); // Height of navigation wrapper


			/* v1.1.0: Main function, then on bottom called window.scroll, ready and resize */
			var mainFunc = function() {

				/* Cache window and window position from the top */
				var win = $(window),
					windowPosition = win.scrollTop(),
					windowWidth = win.width(),
					windowHeight = win.height();

				/* v1.1.0: Optional mobileWidth */
				if (!options.mobile && windowWidth < options.mobileWidth) {
					$self.css('position', $selfPosition);
					return;
				}

				/* Everytime we scroll remove the activeClass. Later on we add it if needed. */
				menuItems.removeClass(options.activeClass);

				/* Add activeClass to the div that is passing the top of the window */
				section.each(function() {
					var top = $(this).offset().top - thisHeight,
						bottom = $(this).outerHeight(true) + top;

					if ((windowPosition >= top) && (windowPosition <= bottom)) {
						if (options.selector === "a") {
							$self.find('li a[name~="#' + this.id + '"]').addClass(options.activeClass);
						} else {
							$self.find('li a[name~="#' + this.id + '"]').parent().addClass(options.activeClass);
						}
					}
				});


				/* 1.) As soon as we start scrolling */
				if (windowPosition >= $selfScrollTop + options.startAt) {

					/* v.1.1.0: sticky/unsticky class */
					/* Add 'sticky' class to this as soon as 'this' is in sticky mode */
					$self.removeClass(options.unstickyModeClass).addClass(' ' + options.stickyModeClass);

					/* As soons as scrolling starts set position of this() to fixed */
					$self.css({
						'position': 'fixed',
						"zIndex": options.zindex,
						'top': 32
					}).stop();

					/* If jQuery effects are turned on */
					if (options.jqueryEffects) {
						if (!options.animateCSSRepeat) {
							$self.hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
						}
						$self.hide().stop()[options.jqueryAnim](options.animDuration, options.easing);

						/* If animateCSS are turned on */
					} else if (options.animateCSS) {

						/* If animateCSSRepeat == true animation will repeat on each scroll  */
						if (options.animateCSSRepeat) {

							/* v1.0.5: animateCSSRepeat Fix */
							/* Restart the animation */
							$self.addClass(options.cssAnimation + ' animated').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(e) {
								$self.removeClass(options.cssAnimation + ' animated');
							});

							/* v1.0.5: animateCSSRepeat Fix */
						} else {

							/* Restart the animation just once */
							$self.addClass(options.cssAnimation + ' animated').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
						}

						/* Else if jQuery and animateCSS are turned off */
					} else {
						$self.stop(); /* Pin navigation to the top */
					}

					/* If top of the window is over this() (nav container) */
				} else {
					/* v.1.1.0: sticky/unsticky class */
					/* Add 'sticky' class to this as soon as 'this' is in sticky mode */
					$self.css({
						'position': options.$selfPosition,
						"zIndex": $selfZindex
					}).removeClass(options.stickyModeClass).addClass(' ' + options.unstickyModeClass);
				}


				/* 2.) As soon as we hit the bottom of the page */
				if (win.scrollTop() + windowHeight >= $(document).height()) {

					/* v1.1.0: Removed bottomAnimation */

					/* Remove activeClass from menuItem before the last and add activeClass to the lastests one */
					menuItems.removeClass(options.activeClass).last().addClass(options.activeClass);

				}

				/* 3.) As soon as we get back to the top of the page */
				/* If top of the window is over this() (nav container) */
				if (windowPosition <= $selfScrollTop) {
					$self.removeClass(options.cssAnimation + ' animated');

					/* If jQuery effects are turned on */
					if (options.jqueryEffects) {

						/* If we are at the very top of the page remove active class */
						/* If we are the top of the page */
						if (windowPosition === 0) {
							menuItems.removeClass(options.activeClass);
						}

						/* If the top of the window is under the this() stick the nav and start the animation */
						if (windowPosition >= $selfScrollTop) {
							$self.css({
								'position': 'fixed',
								"zIndex": options.zindex
							}).hide().stop()[options.jqueryAnim](options.animDuration, options.easing);
						} else {
							$self.css({
								'position': $selfPosition,
								"zIndex": options.zindex
							});
						}

						/* If jQuery effects are turned off */
					} else {

						/* If we are at the very top of the page remove active class */
						if (windowPosition === 0) {
							menuItems.removeClass(options.activeClass);
						}

						/* Set initial position of this() and initial CSS top property */
						$self.css({
							'position': $selfPosition,
							'top': $topOffset
						}).stop().animate({
							top: $topOffset
						}, options.animDuration, options.easing);
					}
				} // ( windowPosition <= $selfScrollTop ) end

			}

			$(window).scroll(mainFunc); // scroll fn end
			$(window).ready(mainFunc);
			$(window).resize(mainFunc);

		}); // return this.each end
	}; // $.fn.stickyNavbar end
})(jQuery, document); // document ready end

// StickyNavbar code
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

// dragdealer.min.js
(function(root,factory){if(typeof define==="function"&&define.amd){define(factory)}else{root.Dragdealer=factory()}})(this,function(){var Dragdealer=function(wrapper,options){this.bindMethods();this.options=this.applyDefaults(options||{});this.wrapper=this.getWrapperElement(wrapper);if(!this.wrapper){return}this.handle=this.getHandleElement(this.wrapper,this.options.handleClass);if(!this.handle){return}this.init();this.bindEventListeners()};Dragdealer.prototype={defaults:{disabled:false,horizontal:true,vertical:false,slide:true,steps:0,snap:false,loose:false,speed:.1,xPrecision:0,yPrecision:0,handleClass:"handle"},init:function(){this.value={prev:[-1,-1],current:[this.options.x||0,this.options.y||0],target:[this.options.x||0,this.options.y||0]};this.offset={wrapper:[0,0],mouse:[0,0],prev:[-999999,-999999],current:[0,0],target:[0,0]};this.change=[0,0];this.stepRatios=this.calculateStepRatios();this.activity=false;this.dragging=false;this.tapping=false;this.reflow();if(this.options.disabled){this.disable()}},applyDefaults:function(options){for(var k in this.defaults){if(!options.hasOwnProperty(k)){options[k]=this.defaults[k]}}return options},getWrapperElement:function(wrapper){if(typeof wrapper=="string"){return document.getElementById(wrapper)}else{return wrapper}},getHandleElement:function(wrapper,handleClass){var childElements=wrapper.getElementsByTagName("div"),handleClassMatcher=new RegExp("(^|\\s)"+handleClass+"(\\s|$)"),i;for(i=0;i<childElements.length;i++){if(handleClassMatcher.test(childElements[i].className)){return childElements[i]}}},calculateStepRatios:function(){var stepRatios=[];if(this.options.steps>1){for(var i=0;i<=this.options.steps-1;i++){stepRatios[i]=i/(this.options.steps-1)}}return stepRatios},setWrapperOffset:function(){this.offset.wrapper=Position.get(this.wrapper)},calculateBounds:function(){var bounds={top:this.options.top||0,bottom:-(this.options.bottom||0)+this.wrapper.offsetHeight,left:this.options.left||0,right:-(this.options.right||0)+this.wrapper.offsetWidth};bounds.availWidth=bounds.right-bounds.left-this.handle.offsetWidth;bounds.availHeight=bounds.bottom-bounds.top-this.handle.offsetHeight;return bounds},calculateValuePrecision:function(){var xPrecision=this.options.xPrecision||Math.abs(this.bounds.availWidth),yPrecision=this.options.yPrecision||Math.abs(this.bounds.availHeight);return[xPrecision?1/xPrecision:0,yPrecision?1/yPrecision:0]},bindMethods:function(){this.onHandleMouseDown=bind(this.onHandleMouseDown,this);this.onHandleTouchStart=bind(this.onHandleTouchStart,this);this.onDocumentMouseMove=bind(this.onDocumentMouseMove,this);this.onWrapperTouchMove=bind(this.onWrapperTouchMove,this);this.onWrapperMouseDown=bind(this.onWrapperMouseDown,this);this.onWrapperTouchStart=bind(this.onWrapperTouchStart,this);this.onDocumentMouseUp=bind(this.onDocumentMouseUp,this);this.onDocumentTouchEnd=bind(this.onDocumentTouchEnd,this);this.onHandleClick=bind(this.onHandleClick,this);this.onWindowResize=bind(this.onWindowResize,this)},bindEventListeners:function(){addEventListener(this.handle,"mousedown",this.onHandleMouseDown);addEventListener(this.handle,"touchstart",this.onHandleTouchStart);addEventListener(document,"mousemove",this.onDocumentMouseMove);addEventListener(this.wrapper,"touchmove",this.onWrapperTouchMove);addEventListener(this.wrapper,"mousedown",this.onWrapperMouseDown);addEventListener(this.wrapper,"touchstart",this.onWrapperTouchStart);addEventListener(document,"mouseup",this.onDocumentMouseUp);addEventListener(document,"touchend",this.onDocumentTouchEnd);addEventListener(this.handle,"click",this.onHandleClick);addEventListener(window,"resize",this.onWindowResize);var _this=this;this.interval=setInterval(function(){_this.animate()},25);this.animate(false,true)},unbindEventListeners:function(){removeEventListener(this.handle,"mousedown",this.onHandleMouseDown);removeEventListener(this.handle,"touchstart",this.onHandleTouchStart);removeEventListener(document,"mousemove",this.onDocumentMouseMove);removeEventListener(this.wrapper,"touchmove",this.onWrapperTouchMove);removeEventListener(this.wrapper,"mousedown",this.onWrapperMouseDown);removeEventListener(this.wrapper,"touchstart",this.onWrapperTouchStart);removeEventListener(document,"mouseup",this.onDocumentMouseUp);removeEventListener(document,"touchend",this.onDocumentTouchEnd);removeEventListener(this.handle,"click",this.onHandleClick);removeEventListener(window,"resize",this.onWindowResize);clearInterval(this.interval)},onHandleMouseDown:function(e){Cursor.refresh(e);preventEventDefaults(e);stopEventPropagation(e);this.activity=false;this.startDrag()},onHandleTouchStart:function(e){Cursor.refresh(e);stopEventPropagation(e);this.activity=false;this.startDrag()},onDocumentMouseMove:function(e){Cursor.refresh(e);if(this.dragging){this.activity=true}},onWrapperTouchMove:function(e){Cursor.refresh(e);if(!this.activity&&this.draggingOnDisabledAxis()){if(this.dragging){this.stopDrag()}return}preventEventDefaults(e);this.activity=true},onWrapperMouseDown:function(e){Cursor.refresh(e);preventEventDefaults(e);this.startTap()},onWrapperTouchStart:function(e){Cursor.refresh(e);preventEventDefaults(e);this.startTap()},onDocumentMouseUp:function(e){this.stopDrag();this.stopTap()},onDocumentTouchEnd:function(e){this.stopDrag();this.stopTap()},onHandleClick:function(e){if(this.activity){preventEventDefaults(e);stopEventPropagation(e)}},onWindowResize:function(e){this.reflow()},enable:function(){this.disabled=false;this.handle.className=this.handle.className.replace(/\s?disabled/g,"")},disable:function(){this.disabled=true;this.handle.className+=" disabled"},reflow:function(){this.setWrapperOffset();this.bounds=this.calculateBounds();this.valuePrecision=this.calculateValuePrecision();this.updateOffsetFromValue()},getStep:function(){return[this.getStepNumber(this.value.target[0]),this.getStepNumber(this.value.target[1])]},getValue:function(){return this.value.target},setStep:function(x,y,snap){this.setValue(this.options.steps&&x>1?(x-1)/(this.options.steps-1):0,this.options.steps&&y>1?(y-1)/(this.options.steps-1):0,snap)},setValue:function(x,y,snap){this.setTargetValue([x,y||0]);if(snap){this.groupCopy(this.value.current,this.value.target);this.updateOffsetFromValue();this.callAnimationCallback()}},startTap:function(){if(this.disabled){return}this.tapping=true;this.setWrapperOffset();this.setTargetValueByOffset([Cursor.x-this.offset.wrapper[0]-this.handle.offsetWidth/2,Cursor.y-this.offset.wrapper[1]-this.handle.offsetHeight/2])},stopTap:function(){if(this.disabled||!this.tapping){return}this.tapping=false;this.setTargetValue(this.value.current)},startDrag:function(){if(this.disabled){return}this.dragging=true;this.setWrapperOffset();this.offset.mouse=[Cursor.x-Position.get(this.handle)[0],Cursor.y-Position.get(this.handle)[1]]},stopDrag:function(){if(this.disabled||!this.dragging){return}this.dragging=false;var target=this.groupClone(this.value.current);if(this.options.slide){var ratioChange=this.change;target[0]+=ratioChange[0]*4;target[1]+=ratioChange[1]*4}this.setTargetValue(target)},callAnimationCallback:function(){var value=this.value.current;if(this.options.snap&&this.options.steps>1){value=this.getClosestSteps(value)}if(!this.groupCompare(value,this.value.prev)){if(typeof this.options.animationCallback=="function"){this.options.animationCallback.call(this,value[0],value[1])}this.groupCopy(this.value.prev,value)}},callTargetCallback:function(){if(typeof this.options.callback=="function"){this.options.callback.call(this,this.value.target[0],this.value.target[1])}},animate:function(direct,first){if(direct&&!this.dragging){return}if(this.dragging){var prevTarget=this.groupClone(this.value.target);var offset=[Cursor.x-this.offset.wrapper[0]-this.offset.mouse[0],Cursor.y-this.offset.wrapper[1]-this.offset.mouse[1]];this.setTargetValueByOffset(offset,this.options.loose);this.change=[this.value.target[0]-prevTarget[0],this.value.target[1]-prevTarget[1]]}if(this.dragging||first){this.groupCopy(this.value.current,this.value.target)}if(this.dragging||this.glide()||first){this.updateOffsetFromValue();this.callAnimationCallback()}},glide:function(){var diff=[this.value.target[0]-this.value.current[0],this.value.target[1]-this.value.current[1]];if(!diff[0]&&!diff[1]){return false}if(Math.abs(diff[0])>this.valuePrecision[0]||Math.abs(diff[1])>this.valuePrecision[1]){this.value.current[0]+=diff[0]*this.options.speed;this.value.current[1]+=diff[1]*this.options.speed}else{this.groupCopy(this.value.current,this.value.target)}return true},updateOffsetFromValue:function(){if(!this.options.snap){this.offset.current=this.getOffsetsByRatios(this.value.current)}else{this.offset.current=this.getOffsetsByRatios(this.getClosestSteps(this.value.current))}if(!this.groupCompare(this.offset.current,this.offset.prev)){this.renderHandlePosition();this.groupCopy(this.offset.prev,this.offset.current)}},renderHandlePosition:function(){if(this.options.horizontal){this.handle.style.left=String(this.offset.current[0])+"px"}if(this.options.vertical){this.handle.style.top=String(this.offset.current[1])+"px"}},setTargetValue:function(value,loose){var target=loose?this.getLooseValue(value):this.getProperValue(value);this.groupCopy(this.value.target,target);this.offset.target=this.getOffsetsByRatios(target);this.callTargetCallback()},setTargetValueByOffset:function(offset,loose){var value=this.getRatiosByOffsets(offset);var target=loose?this.getLooseValue(value):this.getProperValue(value);this.groupCopy(this.value.target,target);this.offset.target=this.getOffsetsByRatios(target)},getLooseValue:function(value){var proper=this.getProperValue(value);return[proper[0]+(value[0]-proper[0])/4,proper[1]+(value[1]-proper[1])/4]},getProperValue:function(value){var proper=this.groupClone(value);proper[0]=Math.max(proper[0],0);proper[1]=Math.max(proper[1],0);proper[0]=Math.min(proper[0],1);proper[1]=Math.min(proper[1],1);if(!this.dragging&&!this.tapping||this.options.snap){if(this.options.steps>1){proper=this.getClosestSteps(proper)}}return proper},getRatiosByOffsets:function(group){return[this.getRatioByOffset(group[0],this.bounds.availWidth,this.bounds.left),this.getRatioByOffset(group[1],this.bounds.availHeight,this.bounds.top)]},getRatioByOffset:function(offset,range,padding){return range?(offset-padding)/range:0},getOffsetsByRatios:function(group){return[this.getOffsetByRatio(group[0],this.bounds.availWidth,this.bounds.left),this.getOffsetByRatio(group[1],this.bounds.availHeight,this.bounds.top)]},getOffsetByRatio:function(ratio,range,padding){return Math.round(ratio*range)+padding},getStepNumber:function(value){return this.getClosestStep(value)*(this.options.steps-1)+1},getClosestSteps:function(group){return[this.getClosestStep(group[0]),this.getClosestStep(group[1])]},getClosestStep:function(value){var k=0;var min=1;for(var i=0;i<=this.options.steps-1;i++){if(Math.abs(this.stepRatios[i]-value)<min){min=Math.abs(this.stepRatios[i]-value);k=i}}return this.stepRatios[k]},groupCompare:function(a,b){return a[0]==b[0]&&a[1]==b[1]},groupCopy:function(a,b){a[0]=b[0];a[1]=b[1]},groupClone:function(a){return[a[0],a[1]]},draggingOnDisabledAxis:function(){return!this.options.horizontal&&Cursor.xDiff>Cursor.yDiff||!this.options.vertical&&Cursor.yDiff>Cursor.xDiff}};var bind=function(fn,context){return function(){return fn.apply(context,arguments)}};var addEventListener=function(element,type,callback){if(element.addEventListener){element.addEventListener(type,callback,false)}else if(element.attachEvent){element.attachEvent("on"+type,callback)}};var removeEventListener=function(element,type,callback){if(element.removeEventListener){element.removeEventListener(type,callback,false)}else if(element.detachEvent){element.detachEvent("on"+type,callback)}};var preventEventDefaults=function(e){if(!e){e=window.event}if(e.preventDefault){e.preventDefault()}e.returnValue=false};var stopEventPropagation=function(e){if(!e){e=window.event}if(e.stopPropagation){e.stopPropagation()}e.cancelBubble=true};var Cursor={x:0,y:0,xDiff:0,yDiff:0,refresh:function(e){if(!e){e=window.event}if(e.type=="mousemove"){this.set(e)}else if(e.touches){this.set(e.touches[0])}},set:function(e){var lastX=this.x,lastY=this.y;if(e.pageX||e.pageY){this.x=e.pageX;this.y=e.pageY}else if(e.clientX||e.clientY){this.x=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;this.y=e.clientY+document.body.scrollTop+document.documentElement.scrollTop}this.xDiff=Math.abs(this.x-lastX);this.yDiff=Math.abs(this.y-lastY)}};var Position={get:function(obj){var curleft=0,curtop=0;if(obj.offsetParent){do{curleft+=obj.offsetLeft;curtop+=obj.offsetTop}while(obj=obj.offsetParent)}return[curleft,curtop]}};return Dragdealer});


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



