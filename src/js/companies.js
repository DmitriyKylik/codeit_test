$(function(){

	$.get('http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList', 	function(data, status){
		getCompData(data);
	}, 'json');

	function getCompData(data){

	var compList = $('.company_list');
	var compCounter = $('.total-comp_counter');
	var compData = data;
	var compDataArr = [];
	var locNameArr = [];
	var countries = [];
	var countryComp = [];
	var partNameArr = [];
	var partValArr = [];



/*-----------------TOTAL-LIST COMPANY START--------------------*/

	function CompListRender(){
	for(var i = 0; i < compData.list.length; i++){
		compDataArr[i] = compData.list[i]; 
		locNameArr[i] = compData.list[i].location;
		compList.append("<li class='company_list-item' data-index='"+ i +"'>" + compDataArr[i].name + "</li>");
	}
	}

	// Rendering compaies number
	function rendTotalComp(counter, number){
		$(counter).html(number);
	}
	// Counting compaies number
	function countTotalComp(compCounter){

		$(compCounter).each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 4000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	}
	CompListRender();
	rendTotalComp(compCounter, compDataArr.length);
	countTotalComp(compCounter);
	getCountryComp(compDataArr);

/*---------------------------TOTAL-LIST COMPANY END--------------------*/


/*----------------------------PARTNERS START----------------------------*/

	var $partners = $('.partners');
	var partList = $('.partners_list');
	var partDataArr = [];
	var $companyItem = $('.company_list-item');
	var $sortPercentDesc = $('.sort_perc-desc');
	var $sortPercentAsc = $('.sort_perc-asc');
	var $sortNameAsc = $('.sort_name-asc');
	var $sortNameDesc = $('.sort_name-desc');
	$(partList).attr('data-default', 'true');		// Default type of sort
	$(partList).attr('data-status', 'percdesc');
	console.log($(partList).attr('data-status', 'percdesc'));

	function sortNameDesc(partArr) { 
		return partArr.sort(function(a, b){
			if (a.name < b.name)
				return -1;
			if (a.name > b.name)
				return 1;
			return 0;
		});
	}

	function sortNameAsc(partArr) {
		return sortNameDesc(partArr).reverse();
	}

	function sortPercentageAsc(partArr) {
		return partArr.sort(function(a, b){
			if (a.value < b.value)
				return -1;
			if (a.value > b.value)
				return 1;
			return 0;
			});
	}

	function sortPercentageDesc(partArr) {
		return sortPercentageAsc(partArr).reverse();
	}

	function partnersRender(partners, status, data){
		var dataSorted = [];
		partners.empty();
		switch(status) {
			case 'percasc':
				dataSorted = sortPercentageAsc(data);
				break;
			case 'percdesc':
				dataSorted = sortPercentageDesc(data);
				break;
			case 'nameasc':
				dataSorted = sortNameAsc(data);
				break;
			case 'namedesc':
				dataSorted = sortNameDesc(data);
				break;
		}

		for(var i = 0; i < dataSorted.length; i++){
			partners.append("<li class='partners_item'><p class='partners_name'>" + dataSorted[i].name +"</p><span class='partners_count'>" + dataSorted[i].value + "%</span></li>");
		}
	}

	function getCompIndex(index){
		for(var i = 0; i < compDataArr[index].partners.length; i++){
			partDataArr = compDataArr[index].partners;			// Getting on click company partners array
		}
	}

	$companyItem.on('click', function(){

		$companyItem.not(this).removeClass('is-active');
		$(this).addClass('is-active');

		var compIndex = $(this).data('index');			// Getting on click company index
		getCompIndex(compIndex);

		if($(partList).attr('data-default') === 'false'){
			partnersRender(partList, $(partList).attr('data-status'), partDataArr );		// Rendering with leaving the last type of sort
		}

		if($(partList).attr('data-default') === 'true'){
			partnersRender(partList, $(partList).attr('data-status'), partDataArr );
		}

		$partners.fadeIn();		// Displaying Partners container
	});

	$sortPercentDesc.on('click', function(){
		partnersRender(partList, 'percdesc', partDataArr );		// Rendering partners in percentage desc order
		$(partList).attr('data-status', 'percdesc');
		$(partList).attr('data-default', 'false');
	});
	$sortPercentAsc.on('click', function(){
		partnersRender(partList, 'percasc', partDataArr);		// Rendering partners in percentage asc order
		$(partList).attr('data-status', 'percasc');
		$(partList).attr('data-default', 'false');
	});
	$sortNameAsc.on('click', function(){
		partnersRender(partList, 'nameasc', partDataArr );		// Rendering partners in name asc order
		$(partList).attr('data-status', 'nameasc');
		$(partList).attr('data-default', 'false');
	});
	$sortNameDesc.on('click', function(){
		partnersRender(partList, 'namedesc', partDataArr );		// Rendering partners in name desc order
		$(partList).attr('data-status', 'namedesc');
		$(partList).attr('data-default', 'false');
	});



/*-----------------------------PARTNERS END----------------------------*/

/*------------------------------------------LOCATION START------------------------------------------*/

	var $arrowBack = $('.back-arrow');
	var $chart = $("#chart_comp");
	var $locList = $('.loc_list');
	var labelsLoc = [];
	var percData = [];

	function ChartListToggle(){
		$locList.toggle();
		$chart.toggle();
	}

	$arrowBack.on('click', function(){
		if($(this).attr('data-status') === 'active'){
			ChartListToggle();
			$(this).attr('data-status', 'disable');
		}
	});

	console.log(countryComp);

	function LocListRender(index){
		$locList.empty();

		for(var i = 0; i < countryComp[index].companies.length; i++){
			$locList.append("<li class='company_list-item'>" + countryComp[index].companies[i] + "</li>");
		}
		$arrowBack.attr('data-status', 'disable');
	}

	function getCountryComp(compArr){
		var countryArr = [];
		var countrySorted = [];

		for (var i = 0; i < compArr.length; i++) {	// Sorting repeating array of countries
			countryArr[i] = compArr[i].location.name
		}
		var unique = function(value, index, self){
			return self.indexOf(value) === index;
		}
		countrySorted = countryArr.filter(unique);	// Get the clean array of countries

		for( var i = 0; i < countrySorted.length; i++){	// Pushing companies by they location
				countryComp[i] = {
					name: countrySorted[i],
					companies:[],
					percent: {}
				};
			for( var j = 0; j < compArr.length; j++){
				
				if(countrySorted[i] === compArr[j].location.name){
					countryComp[i].companies.push(compArr[j].name);
				}
			}
		}

		for(var i = 0; i < countryComp.length; i++){	//Getting the percent of companies by the location
			countryComp[i].percent = (countryComp[i].companies.length / compArr.length)*100;
		}
	}

	function getCountryLabel(countries){
		for (var i = 0; i < countries.length; i++){
			labelsLoc[i] = countries[i].name;
		}
	}

	function getCountryPerc(countries){
		for (var i = 0; i < countries.length; i++){
			percData[i] = countries[i].percent;
		}
	}
	
	getCountryLabel(countryComp);
	getCountryPerc(countryComp);

	var options = {
		exportEnabled: false,
		animationEnabled: true,
		legend:{
			horizontalAlign: "right",
			verticalAlign: "center"
		},
			axisY:{
			labelFontSize: 50
		},
			legend:{
				fontSize: 18,
				cursor: "pointer",
				itemclick: function (e){			//List Of Companies rendering on click
					var countryName = e.dataPoint.name;
					var indexLoc = function getIndex(name){
						var ind;
						for(var i = 0; i < countryComp.length; i++){
							if(countryComp[i].name === name)
							ind = i;
						}
						return ind;
					}
					ChartListToggle();
					LocListRender(indexLoc(countryName));
					$arrowBack.attr('data-status', 'active');
				}
		},
		data: [{
			indexLabelFontSize: 12	,
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name}",
			legendText: "{name} (#percent%)",
			indexLabelPlacement: "inside",
			dataPoints: [
				{ y: percData[0], name: labelsLoc[0] },
				{ y: percData[1], name: labelsLoc[1] },
				{ y: percData[2], name: labelsLoc[2] },
				{ y: percData[3], name: labelsLoc[3] },
				{ y: percData[4], name: labelsLoc[4] },
				{ y: percData[5], name: labelsLoc[5] }
			]
		}]
	};
	$("#chart_comp").CanvasJSChart(options);

/*------------------------------------------LOCATION END------------------------------------------*/
	}
});