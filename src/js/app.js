// example of simple includes for js
// =include lib/jquery.min.js
// =include lib/jquery.validate.min.js
// =include  lib/slick.min.js


$(function(){

	$('#form_sign').validate({
		rules: {
			firstname: {
				required: true,
				minlength: 6,
				maxlength: 60
			},
			lastname: {
				required: true,
				minlength: 6,
				maxlength: 60
			},
			email: {
				required: true,
				email: true
			},
			agree: 'required',
			password: {
				required: true,
				minlength: 6
			}
		},
		messages:{
			firstname: {
				required: 'Enter your First Name',
				minlength: 'Your Firt name must be at least 6 symbols',
				maxlength: 'Your First name must be not greater than 60 symbols'
			},
			lastname: {
				required: 'Enter your Last Name',
				minlength: 'Your Last name must be at least 6 symbols',
				maxlength: 'Your Last name must be not greater than 60 symbols'
			},
			email: {
				required: 'Enter your Email',
				minlength: 'Please enter valid Email'
			},
			password: {
				required: 'Enter your Password',
				minlength: 'Your Password must be at least 6 symbols'
			},
			agree: 'Please accept our conditions'
		}
	});
});
