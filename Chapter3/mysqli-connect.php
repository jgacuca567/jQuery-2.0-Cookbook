<?php
/** This file provides the information for accessing the database sand coonnecting to MySQL. It also sets the language coding to utf-8 */

/** Define constants */
$dbhost = 'localhost';
$dbuser = 'admin9971';
$dbpass = '8J]9D^d#v68}&xa7+(ov;(3A644x7=';
$dbname = 'jquerycookbook';

$db = new mysqli($dbhost, $dbuser, $dbpass);

$db->select_db($dbname);
if ($db->connect_errno > 0) {
	die('ERROR! - COULD NOT CONNECT TO MySQL DATABASE: ' . $db->connect_error);
}

/** Next we assign the database connection to a variable that we will call $dbcon */
$dbcon = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) OR die('Could not connect to MYSQL: ' . mysqli_connect_error());

/** Finally, we set the language encoding as utf-8 */
mysqli_set_charset($dbcon, 'utf8');
?>
