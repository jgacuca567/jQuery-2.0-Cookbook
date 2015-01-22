<?php
	session_start();
	require_once ('mysqli-connect.php');
	$username = isset($_POST['username']) ? strtolower($_POST['username']) : "";
	$password = isset($_POST['password']) ? $_POST['password'] : "";

	$response = array(
		'success' => false,
		'errors' => "",
		'user' => array()
	);

	$query = "SELECT `id` FROM `user` WHERE `username` = ? AND `password` = ? LIMIT 1";
	$stmt = $mysqli->stmt_init();
	if ($stmt->prepare($query)) {
		$password = crypt($password, $pwsalt);
		$stmt->bind_param("ss", $username, $password);
		if ($stmt->execute()) {
			$res = $stmt->get_result();
			if($res->num_rows > 0) {
				$row = $res->fetch_assoc();
				$response["success"] = true;
				$_SESSION['uid'] = $response["user"]["id"] = $row["id"];
				$_SESSION['username'] = $response["user"]["username"] = $username;
			} else{
				$response["error"] = "Incorrect username or password";
			}
		} else{
			$response["error"] = "Could not execute query";
		}
	} else{
		$response["error"] = "Could not query database";
	}
	$stmt->close();
	$mysqli->close();
	header("Content-Type: application/json; charset=UTF-8");
	echo json_encode($response);
?>
