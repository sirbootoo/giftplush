/* ;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};



	// Carousel Feature Slide
	var owlCrouselFeatureSlide = function() {
		var owl = $('.owl-carousel-main');
		owl.owlCarousel({
			items: 1,
			mouseDrag: false,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: true,
			dots: true,
			autoHeight: true,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
		    navText: [	
		      "<i class='icon-arrow-left2 owl-direction'></i>",
		      "<i class='icon-arrow-right2 owl-direction'></i>"
	     	]
		});
	};


	var owlCarouselScreenshots = function() {
		var owl = $('.owl-carousel-center');

		owl.owlCarousel({
		    center: true,
		    items:1,
		    mouseDrag: false,
		    loop: false,
		    margin: 10,
		    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:4
	        },
	        1000:{
	            items:5
	        }
	    }
		});


		$('body').on('click', '.owl-item', function(){

			var $this = $(this),
				index = $this.index();

				console.log(index);
			$('.owl-carousel-center .owl-dots > div').eq(index).trigger('click');
		});
	}




	


}()); */