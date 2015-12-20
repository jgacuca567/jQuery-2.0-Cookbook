<?php
/** Define constants */
$dbhost = 'localhost';
$dbuser = 'admin9971';
$dbpass = '8J]9D^d#v68}&xa7+(ov;(3A644x7=';
$dbname = 'jquerycookbook';

$db = new mysqli($dbhost, $dbuser, $dbpass);

$db->select_db($dbname);
if ($db->connect_errno > 0) 	die('Error! - Could not connect to MYSQL: ' . $db->connect_error);
}
?>
     