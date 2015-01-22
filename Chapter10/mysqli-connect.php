<?php
    $mysqli = new mysqli("localhost", "admin9997", "WP6cV+~SqUU~w#Nzu9", "jquery2webdbcookbook");
    if ($mysqli->connect_errno) {
    	die("Failed to Connect to MySQL: (". $mysqli->connect_errno . ") " . $mysqli->connect_error);
    }
    $pwsalt = "WP6cV+~SqUU~w#Nzu9";
?>
