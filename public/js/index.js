'use strict';
/**
 * Return submit form  
 * 
 * @param {NodeList object} form  HTML form
 *
 * @return {method} form.submit
*/
function validateForm (form) {
	resetError();
	var inputElements = document.getElementsByTagName('input');
	window.validated = true;
	
	validateEmptyFields(inputElements);
	validateEmail(inputElements[0]);
	validatePasswd(inputElements[1]);
	
	searchError();

	if (window.validated === true) {
		return  form.submit();
	};
} //end validateForm()


/*
 * @param {NodeList object} elementList List items tagged input
 *
 * @return void
*/
function validateEmptyFields (elementList) {
	
	for (var i = 0; i < elementList.length; i++) {
		var element      = elementList[i].name;
		
		if (isNaN(elementList[i].value) == false) {
			window.validated = false;
			forms[element]   = {
				error   : true,
				message : message.emptyField,
				node    : elementList[i]
			};
		}
		else {
			forms[element] = {
				error : false
			};
		}
	};
} //end validateEmptyFields()


/*
 * @param {object HTML Colletion} objectMail 
 *
 * @return void
*/
function validateEmail (objectMail) {
	
	if (objectMail.value === "") {
		return;
	} 
	else {

		if (emailRegex.test(objectMail.value) == false) {
			forms.incorrectEmail = {
				error   : true,
				message : message.incorrectEmail,
				node    : objectMail
		 	};
		 	
		 	window.validated = false;
		}
		else {
			forms.incorrectEmail = {
				error : false
			}
		}
	};
} //end validateEmail()


/*
 * @param {object HTML Colletion} objecPassword 
 *
 * @return void
*/
function validatePasswd (objectPassword) {
	
	
	if (objectPassword.value === "") {
		return;
	}
	else {

		if (passwdRegex.test(objectPassword.value) == true) {
			forms.incorrectPasswd = {
				error   : true,
				message : message.incorrectPasswd,
				node    : objectPassword
		 	};
		 	
		 	window.validated = false;
		}
		else {
			forms.incorrectPasswd = {
				error : false
		 		}
		 	}
		};
} //end validatePasswd()


/*
 * Iterates through the properties of an object
 * and calls a function
 *
 * @return  void
*/
function searchError () {
	
	for (var childObject in forms) {
	
		if (forms[childObject].error === true) {
			
			showError(forms[childObject].node, forms[childObject].message);
		}
	}
} //end searchError()


/*
 * @param {object HTML Colletion} element HTML form element
 * @param {string} errorMessage  
 *
 * @return void
*/
function showError (element, errorMessage) {
	var parent = element.parentNode;
  	var div    = document.createElement('div');
  	
  	div.className = "alert alert-error";
  	div.innerHTML = errorMessage;
  	parent.insertBefore(div, element.nextSibling);
} //end showError()


/*
 * Removes tags from the specified class Сss
 *
 * @return void
*/
function resetError () {
	var elem = document.querySelectorAll("div.alert, div.alert-error");
      
    if (elem) {
    	for (var i = 0; i < elem.length; i++) {
    		elem[i].remove();
      	}
    };
} //end resetError()


/*
 * @param {number} indexLang Attribute option tags select 
 *
 * @return void
*/
function changeLang (indexLang) {
	        var h2 = document.getElementsByTagName('h2'),
		inputs = document.getElementsByTagName('input'),
		a      = document.getElementsByTagName('a'),
		button = document.getElementsByTagName('button');

	if (indexLang === 2) {
		h2[0].innerHTML          = "Please sign in";
		inputs.email.placeholder = "Email addres";
		inputs.pass.placeholder  = "Password";
		a[0].innerHTML           = "Remember me";
		button[0].innerHTML      = "Sign in";

		message = {
			emptyField      : 'This field is empty, fill it up please',
			incorrectEmail  : 'Invalid email address',
			incorrectPasswd : 'The password must not contain special characters'
		};
	} 
	else if (indexLang === 1) {
		h2[0].innerHTML          = "Пожалуйста,войдите";
		inputs.email.placeholder = "Email адрес";
		inputs.pass.placeholder  = "Пароль";
		a[0].innerHTML           = "Регистрация";
		button[0].innerHTML      = "Вход";

		message = {
			emptyField      : 'Это поле пустое, заполните его пожалуйста',
			incorrectEmail  : 'Не корректный  адрес email',
			incorrectPasswd : 'Пароль не должен содержать специальные символы'
	    };
	};
	
	return;
} //end changeLang()


var message = {
	emptyField      : 'Это поле пустое, заполните его пожалуйста',
	incorrectEmail  : 'Не корректный  адрес email',
	incorrectPasswd : 'Пароль не должен содержать специальные символы'
},
errors = {
	emptyEmail      : false,
	emptyPassw      : false,
	incorrectEmail  : false,
	incorrectPasswd : false
},
forms = {},
validated,
form = document.querySelector("form"),
emailRegex  =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
passwdRegex = /(?=.*[\\!@#$%\^&*()_+"№;:?=\/|.,-]|\s+)/;


addEventListener('submit', function(e){
  e.preventDefault();
  validateForm(form);
});

var select = document.getElementById('lang');

select.addEventListener('change', function(e){
	changeLang(select.selectedIndex);
});
