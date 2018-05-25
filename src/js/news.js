$(function(){
		$.get('http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList', function(data, status){
			var $slickOpts = {
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
		};

		getNewsData(data);
		$('.news_slider').slick($slickOpts);
	}, 'json');

	function getNewsData(data){
		var newsData = data;
		var $newsTextual = $('.news_textual');
		var $newsSlider = $('.news_slider');
		var $newsItem = $('.news_item');
		var $slickTrack = $('.slick-track');

		function formatDate(timestamp){
			var date = new Date(timestamp*1000);
			var day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
			var month = "0" + date.getMonth();
			var year = "0" + date.getYear();
			var formattedTime = day + '.' + month.substr(-2) + '.' + year.substr(-2);
			return formattedTime;
		}

		function newsRender(data){
			var htmlPut;
			var date;
			for(var i = 0; i < data.list.length; i++){
				date = formatDate(data.list[i].date);
				htmlPut = "<div class='news_item'><h2 class='news_title'>Title</h2><div class='news_textual'>\
					<div class='news_photo' style= 'background-image: url(" + data.list[i].img +");'></div>\
					<p class='news_text'>" + data.list[i].description + "</p></div>\
					<div class='news_meta'><p class='meta_textual'><span class='news_meta-title'>Author:</span>\
					<span class='news_author'>" + data.list[i].author + "</span></p>\
					<p class=meta_textual><span class=news_meta-title>Date:</span>\
					<span class=news_meta-date>" + date + "</span></p></div></div>";
				$newsSlider.append(htmlPut);
			}
		}
		newsRender(data);
	}
});