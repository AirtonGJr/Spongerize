/*
 * jQuery Spongerize Plugin 0.1
 * Sta. Helena, Airton - 2015
 * Based on:
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.spongerize = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000 //time before raptor attacks on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {

			var _this = $(this);
			var audioSupported = false;
			//Stupid Browser Checking which should be in jQuery Support
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
				audioSupported = true;
			}
			
			//Raptor Vars
			var leBobImageMarkup = '<img id="leBob" style="display: none" src="leBob.png" />'
			var leBobAudioMarkup = '<audio id="leBobShriek" preload="auto"><source src="spongebob-laugh.mp3" /></audio>';	
			var locked = false;
			
			//Append Raptor and Style
			$('body').append(leBobImageMarkup);
 			if(audioSupported) { $('body').append(leBobAudioMarkup); }
			var leBob = $('#leBob').css({
				"position":"fixed",
				"bottom": "-700px",
				"right" : "-650px",
				"display" : "block",
				"width" : "700px"
			})
			
			// Animating Code
			function init() {
				locked = true;
			
				//Sound Hilarity
				if(audioSupported) { 
					function playSound() {
						document.getElementById('leBobShriek').play();
					}
					playSound();
				}
								
				// Movement Hilarity	
				leBob.animate({
					"bottom" : "0"
				}, function() { 			
					$(this).animate({
						"bottom" : "0px"
					}, 100, function() {
						var offset = (($(this).position().left)+500);
						$(this).delay(300).animate({
							"right" : offset
						}, 8200, function() {
							leBob = $('#leBob').css({
								"bottom": "-700px",
								"right" : "-650px"
							})
							locked = false;
						})
					});
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.lebob", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	$(window).unbind('keydown.lebob');
			        }
			    }, true);
	
			}
			
        });//each call
    }//orbit plugin call
})(jQuery);

