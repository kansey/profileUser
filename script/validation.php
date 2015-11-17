<?php

/**
  * 
  */
  class Validation 
  {


/*
 * Check the empty fields
 *
 * @param array $fields this array with data users
 *
 * @return void
*/
  	public function emptyFields($fields)
  	{
  		foreach ($fields as $key) {
  			if (empty($key)) {
  				header ( "Location: /404.html" );
  			}
  		}

  		return; 		  		
  	} //end emptyFields()


/*
 * Check for correct email 
 *
 * @param string $email  this string with the value 
 *
 * @return void
*/
  	public function validationEmail($email)
  	  	{
  	  		$check = filter_var($email,FILTER_VALIDATE_EMAIL);
			if ($check === false) {
					header ( "Location: /404.html" );
				}
			
			return;
		} //end validationEmail()


/*
 * Check for correct password
 *
 * @param string $pass this string with the value of the user's password
 *
 * @return void
*/
	public function validationPassword($pass)
	  	{
	  		if (preg_match("/(?=.*[\\!@#$%\^&*()_+\"№;:?=\/|.,-]|\s+)/", $pass)) {
	  			header ( "Location: /404.html" );
	  		}
	  		else {
	  			return;
	  		}
	  		
	  	} //end validationPassword()


/*
 * Check identical fields
 *
 * @param 
 * @param
 *
 * @return void
*/
	public function confirmFields($field1, $field2)
	 	{
	 		if ($field1 !== $field2) {
	 			header ( "Location: /404.html" );
	 		}

	 		return;
	 	} //end confirmFields()


/*
 * Removes extra characters if they are present
 *
 * @param array $arr this array with data users
 *
 * @return void
*/
	public function clean($arr)
	 	{
	 		foreach ($arr as $str) {
	 			
	 			$str = trim($str);
    			$str = stripslashes($str);
    			$str = strip_tags($str);
    			$str = htmlspecialchars($str);
  			}

  			return;
	 	} //end clean() 	
  } //end class    

?>