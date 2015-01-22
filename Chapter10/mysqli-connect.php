<?php
    $dbcon = new mysqli("localhost", "admin9997", "WP6cV+~SqUU~w#Nzu9", "jquery2webdbcookbook");
    if ($dbcon->connect_errno) {
    	die("Failed to Connect to MySQL: (". $dbcon->connect_errno . ") " . $dbcon->connect_error);
    }
    $pwsalt = "WP6cV+~SqUU~w#Nzu9";
?>
