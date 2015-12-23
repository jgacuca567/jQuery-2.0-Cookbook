<?php
session_start();

require_once("mysqli-connect.php");
$text = isset($_POST['text']) ? $_POST['text'] : "";

$response = array(
    "success" => false,
    "error" => "",
    "notes" => array()
);

if (!isset($_SESSION['uid'])) {
	$response["error"] = "You must be logged in to add a new note";
} else{
	$query = "SELECT * FROM `note` WHERE `user_id` = ? ORDER BY `added` DESC ";
	$stmt = $mysqli->stmt_init();
	if ($stmt->prepare($query)) {
		$stmt->bind_param("s", $_SESSION['uid']);
		if ($stmt->execute()) {
			$res = $stmt->get_result();
			$response["success"] = true;
			if ($res->num_rows > 0) {
				while($row = $res->fetch_assoc()){
					$response["notes"][] = array(
							"id" => $row["id"],
							"text" => $row["text"],
							'added' => $row["added"]
						);
				}
			} else{
				$response["error"] = "Could not execute query";
			}
		} else{
			$response["error"] = "Could not query database";
		}
	}
	$stmt->close();
}

$mysqli->close();
header("Content-Type: application/json; charset=UTF-8");
echo json_encode($response);
?>
