<?php
require_once('/var/www/script/validation.php');

/*
 * Select rows from the database corresponding to the conditions
 *
 * @param string $email this string with the value 
 * @param string $pass this string with the value of the user's password
 *
 * @return array $result containing the selected rows
*/
function selectDataOfUser($email, $pass)
	{
		$db    = connectToDB();
		$query = $db->prepare(
			'SELECT email, pass 
							FROM users
    							WHERE email = ? AND pass = ?'
    	);

    	if ($query->execute(array($email, $pass))) {
    		
    		$result = $query->fetch(PDO::FETCH_ASSOC);
    		return $result;	
    	} 
    	else {
    		header ( "Location: /404.html" );
    	}
    } //end selectDataOfUser()


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
 * Searches for user images
 *
 * @param string $email this string with the value 
 *
 * @return array $image image with name
*/
function searchImage($email)
 	{
 		$pattern   =  substr($email, 0,4);
 		$imageList = scandir('/var/www/public/image/');
 		$templ = "/$pattern*/";

 		$filterImage = function ($str) use ($templ) {
 			if (preg_match($templ, $str)) {
 				return $str;
			}
			
		};

		$image = array_filter($imageList, $filterImage);
		return $image;
 	} //end searchImage()


/*
	Data from the input field of HTML
*/
$email = $_POST["email"];
$pass  = $_POST["pass"];
/*
	REVISION
*/
$valClass = new Validation();
$valClass->emptyFields($_POST);
$valClass->validationEmail($email);
$valClass->validationPassword($pass);


$data = selectDataOfUser($email, $pass);

/*
	Initial array with data image
*/
$image = array();

if ($data["email"] === $email and $data["pass"] === $pass) {
	 $image = searchImage($email);
	 $image = array_values($image);
} 
else {
	header ( "Location: /404.html" );

}
/*
	Load HTML template
*/
$pathImage = "http://localhost/public/image/" . $image[0];
include('/var/www/public/html/profile.html');

?>
