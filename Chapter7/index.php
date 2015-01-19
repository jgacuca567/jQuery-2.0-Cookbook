<?php
	$response = new stdClass;
	$response->success = false;
	$response->error = "Username and password must be provided";
	if (isset($_POST['username']) && isset($_POST['password'])) {
		$username = $_POST['username'];
		$password = $_POST['password'];
		if ($username == 'MyUsername' && $password == 'MyPassword') {
			$response->success = true;
		} else {
			$response->error = "Incorrect login credentials";
		}
	}
	header("Content-type: application/json; charset=UTF-8");
	echo json_encode($response);
?>
