<?php
session_start();

require_once("mysqli-connect.php");
$text = isset($_POST['text']) ? $_POST['text'] : "";

$response = array(
    "success" => false,
    "error" => "",
);

if (!isset($_SESSION['uid'])) {
    $response["error"] = "You must be logged in to add a new note";
} else if (strlen($text) <= 0 || strlen($text) > 1024) {
    $response["error"] = "A note must be between 1 and 1024 characters in length";
} else {
    $query = "DELETE FROM `note` WHERE `id` = ?";
    $stmt = $mysqli->stmt_init();
    if ($stmt->prepare($query)) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            $stmt->close();
            $response["success"] = true;
        } else {
            $response["error"] = "Could not execute query";
        }
    } else {
        $response["error"] = "Could not insert new note, please try again";
    }
}

$mysqli->close();
header("Content-Type: application/json; charset=UTF-8");
echo json_encode($response);
?>
