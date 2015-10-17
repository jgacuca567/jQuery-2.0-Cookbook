<?php
/** Create an array of people */
$people = array(
	1 => array(
		'firstname' => 'Luke',
		'lastname' => 'Skywalker',
	),
	2 => array(
		'firstname' => 'Darth',
		'lastname' => 'Vader',
	),
	3 => array(
		'firstname' => 'Mace',
		'lastname' => 'Windu',
	),
);

/** Ensure the browser is expecting the correct content type format and charset */
header("Content-Type: application/json; charset=UTF-8");

/** Encode the array of people into JSON data */
echo json_encode($people);
?>
