<?php
/** Prepare an object to hold data we are gointg to send back to the jQuery */
$data = new stdClass;
$data->success = false;
$data->results = array();
$data->error = NULL;

/** Has the text been posted? */
if (isset($_POST['text'])) {

	/** Connect to the database */
	require_once 'mysqli-connect.php';

	/** Escape the text to prevent SQL injection */
	$text = $db->real_escape_string($_POST['text']);

	/** Run a LIKE query to search for titles that are like the entered text */
	$q = "SELECT * FROM `stationary` WHERE `title` LIKE '%{$text}%'";
	$result = $db->query($q);

	/** Did the query complete successfully? */
	if (!$result) {
		/** If not add an error to the data array */
		$data->error = "Could not query database for search results, MYSQL ERROR: " . $db->error;
	} else {
		/** Loop through the results and add to the results array */
		while ($row = $result->fetch_assoc()) {
			$data->results[] = array(
				'id' => $row['id'],
				'title' => $row['title'],
			);
		}
		/** Everything went to plan so set success to true */
		$data->success = true;
	}
}
/** Set the content type for a json object and ensure charset is UTF-8. Not utf8 otherwise it will not work in IE*/
header("Content-Type: application/json; charset=UTF-8");

/** json encode the data */
echo json_encode($data);
?>