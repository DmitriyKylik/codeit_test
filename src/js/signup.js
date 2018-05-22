$(function(){

	var formSign = $('#form_sign');
	var serverResp;
	var serverUrl = 'http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration';
	var servResp = $('.serv-resp');
	
	$('.sort_name-asc').on('click', function(){
		console.log('Ho-HO-ho');
		alert('Ho-HO-ho');
	});

	formSign.validate({
		rules: {
			name: {
				required: true,
				minlength: 6,
				maxlength: 60,
			},
			secondname: {
				required: true,
				minlength: 5,
				maxlength: 60,
			},
			email: {
				required: true,
				email: true,
			},
			gender: {
				required: true,
			},
			pass: {
				required: true,
				minlength: 6,
			},
			passwordconf: {
				required: true,
				equalTo: '#sign_pass'
			},
			agree: 'required'
		},
		messages:{
			name: {
				required: 'Enter your Name',
				minlength: 'Your First name must be at least 6 symbols',
				maxlength: 'Your First name must be not greater than 60 symbols'
			},
			secondname: {
				required: 'Enter your Second Name',
				minlength: 'Your Second name must be at least 6 symbols',
				maxlength: 'Your Second name must be not greater than 60 symbols'
			},
			email: {
				required: 'Enter your Email',
				minlength: 'Please enter valid Email'
			},
			gender: {
				required: 'Choose your male'
			},
			pass: {
				required: 'Enter your Password',
				minlength: 'Your Password must be at least 6 symbols'
			},
			passconf: {
				required: 'Confirm your Password',
				equalTo: 'Please repeat your password correctly'
			},
			agree: 'Please accept our conditions'
		},
		submitHandler: function (form){
			var formVal = $(form).serialize();

			$.post(serverUrl, formVal, function(data, status){
				console.log(data.status);
				if(data.status === ('Form Error' || 'Error')){
					servResp.css({color: 'red'});
				}else{
					servResp.css({color: 'green'});
				}
				servResp.html(data.message).fadeIn();

				// if(data.status === 'OK'){
				// 	window.location.replace('companies.html');
				// }
			});
			return false
		}
	});
});