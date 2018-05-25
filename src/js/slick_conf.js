$(function(){

	$('.news_slider').slick({
		speed: 250,
		rows: 0,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		responsive: [
		{
			breakpoint: 920,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}
		]
	});

});