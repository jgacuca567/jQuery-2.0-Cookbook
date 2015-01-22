<?php
	require_once ('mysqli-connect.php');
	$username = isset($_POST['username']) ? strtolower($_POST['username']) : "";
	$password = isset($_POST['password']) ? $_POST['password'] : "";
	$passwordAgain = isset($_POST['passwordagain']) ? $_POST['passwordagain'] : "";

	$response = array(
		'success' => false,
		'errors' => array()
	);
	if (strlen($username) < 3 || strlen($username) > 32) {
		$response["errors"]["username"] = "Username must be between 3 and 64 characters in length";
	} else{
		$query = "SELECT `id` FROM `user` WHERE `username` = ? LIMIT 1 ";
		$stmt = $dbcon->stmt_init();
		if ($stmt->prepare($query)) {
			$stmt->bind_param("s", $username);
			if ($stmt->execute()) {
				$stmt->store_result();
				if ($stmt->num_rows > 0) {
					$response["errors"]["username"] = "Username has already been taken";
				}
			} else{
				$response["errors"]["username"] = "Could not execute query";
			}
		} else{
			$response["errors"]["username"] = "Could query database for existing usernames";
		}
		$stmt->close();
	}
	if (strlen($password) < 6 || strlen($password) > 32) {
		$response["errors"]["password"] = "Password must be between 6 and 32 characters in length";
	}
	if ($password != $passwordAgain) {
		$response["errors"]["passwordagain"] = "Passwords must match";
	}
	if (empty($response["errors"])) {
		$query = "INSERT INTO `user` (`username`, `password`) VALUES (?, ?)";
		$stmt = $dbcon->stmt_init();
		if ($stmt->prepare($query)) {
			$password = crypt($password, $pwsalt);
			$stmt->bind_param("ss", $username, $password);
			if ($stmt->execute()) {
				$stmt->close();
				$response["success"] = true;
			} else{
				$response["errors"]["username"] = "Could not execute query";
			}
		} else{
			$response["errors"]["username"] = "Could not insert new user, please try again";
		}

	}
	$dbcon->close();
	header("Content-Type: application/json; charset=UTF-8");
	echo json_encode($response);
?>
