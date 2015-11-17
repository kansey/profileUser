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
	
	var email         = inputElements[0],
		confirmEmail  = inputElements[1],
		passwd        = inputElements[2],
		confirmPasswd = inputElements[3],
		image         = inputElements[4];

	window.validated = true;
	
	validateEmptyFields(inputElements);
	validateEmail(email);
	validatePasswd(passwd);
	authEmail(email, confirmEmail);
	authPasswd(passwd, confirmPasswd);
	checkFileLoad(label[0],image.value);
	
	searchError();
	
	if (window.validated === true) {
		return  form.submit();
	}	
	
} //end validateForm()


/*
 * @param {NodeList object} elementList List items tagged input
 *
 * @return void
*/	
function validateEmptyFields (elementList) {
	
	for (var i = 0; i < elementList.length - 1; i++) {
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
} //end validatePasswd
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
  	var div = document.createElement('div');
  	
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
 * @param {object HTML Colletion} email Element text box with email
 * @param {object HTML Colletion} confirm Element text box with a confirm email
 *
 * @return void
*/
function authEmail (email, confirm) {

	if (email.value === "" && confirm.value === "") {
		return;
	} 
	else {
		if (email.value === confirm.value) {
			forms.confirmEmail = {
				error : false
			};
		} 
		else {
			forms.confirmEmail = {
				error   : true,
				message : message.confirmEmail,
				node    : confirm
			};
			window.validated = false;
		};
	};
	return;
} //end authEmail()


/*
 * @param {object HTML Colletion} email Element text box with password
 * @param {object HTML Colletion} confirm Element text box with a confirm password
 *
 * @return void
*/
function authPasswd (passwd, confirm) {
	
	if (passwd.value === "" && confirm.value === "") {
		return;
	} 
	else {
		if (passwd.value === confirm.value) {
			forms.confirmPasswd = {
				error : false
			};
		} 
		else {
			forms.confirmEmail = {
				error   : true,
				message : message.confirmPasswd,
				node    : confirm
			};
			window.validated = false;
		};
	};
	return;
} //end authPasswd()


/*
 * @param {object HTMLButton Element} element 
 * @param {string} path Path to upload File
 *
 * @return void
*/
function showPathToUploadFile (element, path) {
	var parent = element.parentNode,
	    div    = document.createElement('div');
  	
  	div.className = "alert alert-success";
  	div.innerHTML = path;
  	parent.insertBefore(div, element.previousSibling);
  	return;
} //end showPathToUploadFile()


/*
 * @param {object HTMLButton Element} element 
 * @param {string} path Path to upload File
 *
 * @return void
*/
function checkFileLoad (element,path) {
	
	if (path === "") {
		var parent = element.parentNode,
	    div    = document.createElement('div');
  	
  		div.className = "alert alert-error";
  		div.innerHTML = message.imageNotLoad;
  		parent.insertBefore(div, element.previousSibling);

  		window.validated = false;
	} 
	return;
} //end checkFileLoad()


/*
 * @param {number} indexLang Attribute option tags select 
 *
 * @return void
*/
function changeLang(indexLang)  {
	var inputs       = document.getElementsByTagName('input'),
		selectButton = document.getElementsByClassName('button'),
	 	inputClass   = document.getElementsByClassName('input'),
	 	buttonTag    = document.getElementsByTagName('button'),
	 	h2     		 = document.getElementsByTagName('h2');

	 	if (indexLang === 2) {
	 		inputs[0].placeholder     = "Email addres";
	 		inputs[1].placeholder     = "Repeat email addres";
	 		inputs[2].placeholder     = "Password";
	 		inputs[3].placeholder     = "Repeat password";
	 		selectButton[0].innerHTML = "Select";
	 		inputClass[0].innerHTML   = "Choose image";
	 		buttonTag[0].innerHTML    = "Submit";
	 		h2[0].innerHTML           = "Registration";

	 		message = {
	 			emptyField      : 'This field is empty, fill it up please',
				incorrectEmail  : 'Invalid email address',
				incorrectPasswd : 'The password must not contain special characters',
				confirmEmail    : 'The entered email addresses do not match',
				confirmPasswd   : 'The entered passwords do not match',
				imageNotLoad    : 'Please select an image'
	 		};
	 	} 
	 	else if (indexLang === 1) {
	 		inputs[0].placeholder     = "Введите адрес email";
	 		inputs[1].placeholder     = "Подтвердите адрес email";
	 		inputs[2].placeholder     = "Введите пароль";
	 		inputs[3].placeholder     = "Подтвердите пароль";
	 		selectButton[0].innerHTML = "Выбрать";
	 		inputClass[0].innerHTML   = "Выбрать файл";
	 		buttonTag[0].innerHTML    = "Регистрация";
	 		h2[0].innerHTML           = "Регистрация";

	 		message = {
	 			emptyField      : 'Это поле пустое, заполните его пожалуйста',
				incorrectEmail  : 'Не корректный  адрес email',
				incorrectPasswd : 'Пароль не должен содержать специальные символы',
				confirmEmail    : 'Введенные адреса email  не совпадают',
				confirmPasswd   : 'Введенные пароли не совпадают',
				imageNotLoad    : 'Пожалуйста, выберите изображение'
			};	
	 	};
	return; 	
} //end changeLang()


var message = {
	emptyField      : 'Это поле пустое, заполните его пожалуйста',
	incorrectEmail  : 'Не корректный  адрес email',
	incorrectPasswd : 'Пароль не должен содержать специальные символы',
	confirmEmail    : 'Введенные адреса email  не совпадают',
	confirmPasswd   : 'Введенные пароли не совпадают',
	imageNotLoad    : 'Пожалуйста, выберите изображение'
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

var image = document.getElementById('image'),
 	label = document.getElementsByTagName('button');

image.addEventListener('change', function(e){
  e.preventDefault();
  showPathToUploadFile(label[0],image.value);
});

var select = document.getElementById('lang');

select.addEventListener('change', function(e){
	changeLang(select.selectedIndex);
});