<?php
require_once('/var/www/script/validation.php');


/*
 * Check the size limit image
 *
 * @param integer $size image size
 *
 * @return void
*/
 function checkImageSize($size)
 	{
 		if ($size > 5000000) {
 			header ( "Location: /404.html" );
 	}

 	return;
 	} //end checkImageSize()


/*
 * Save the image with the specified name
 *
 * @param string $path this string with path to file
 * @param string $email this string with the value 
 * @param string $name this sting with image name
 *
 * @return void
*/
 function saveImageAndRename($path, $email, $name)
 	{
 		$uploaddir  = '/var/www/public/image/';
 		$newName    =  substr($email, 0,4);
 		$format     = substr($name, strrpos($name, '.'));
 		$newName   .= $format;
 		move_uploaded_file($path, $uploaddir . $newName);
 		return;
 	} //end saveImageAndRename()


/*
 * Connecting to the database
 *
 * @return class object PDO with data on connection
*/
  function connectToDB()
  	{
  		$user   = 'root';
 		$passDB = '123456';

  		try {
  			$dbh = new PDO(
  				'mysql:host=localhost;dbname=alboms;charset=utf8', 
 	 			$user, 
 	 			$passDB,
 	 			array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'')
 			);

 			return $dbh;
  		} 
  		catch (PDOException  $e) {
  			    echo $e->getMessage();
  		}
 	} //end connectToDB()


/*
 * Inserts data into the database
 *
 * @param string $email this string with the value 
 * @param string $pass this string with the value of the user's password
 * @param class object PDO  $db this data for the connection DB
 *
 * @return void 
*/
 	function insertDataOfUser($email, $pass)
 	{
 		$db     = connectToDB();
 		$insert =  $db->prepare('INSERT INTO users(email, pass) VALUES(?, ?)');
		$insert->bindParam(1, $email);
		$insert->bindParam(2, $pass);
		
		if ($insert->execute()) {
			return;
		} 
		else {
			header ( "Location: /404.html" );
			
		}
	} //end  insertDataOfUser()

/*
	Data from the input field of HTML
*/
 $email         = $_POST["email"];
 $confirm_email = $_POST["confirm_email"];
 $pass          = $_POST["pass"];
 $confirm_pass  = $_POST["confirm_pass"];
 

/*
	Data on the loaded image
*/
 $path 	    = $_FILES["photo"]["tmp_name"];
 $size 	    = $_FILES["photo"]["size"];
 $nameImage = $_FILES["photo"]["name"];
 
 
 /*
 	Check data
 */
 
 $valClass = new Validation();
 
 $valClass->emptyFields($_POST);
 $valClass->clean($_POST); 
 $valClass->validationEmail($email);
 $valClass->validationPassword($pass);
 $valClass->confirmFields($email, $confirm_email);
 $valClass->confirmFields($pass, $confirm_pass);
 checkImageSize($size);


 saveImageAndRename($path, $email, $nameImage);


 insertDataOfUser($email, $pass);
 
 header("Location: http://localhost/public/html/index.html");

?>
