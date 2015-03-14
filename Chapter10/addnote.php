<?php
session_start();

require_once("mysqli-connect.php");
$text = isset($_POST['text']) ? $_POST['text'] : "";

$response = array(
    "success" => false,
    "error" => "",
    "note" => array()
);

if (!isset($_SESSION['uid'])) {
    $response["error"] = "You must be logged in to add a new note";
} else if (strlen($text) <= 0 || strlen($text) > 1024) {
    $response["error"] = "A note must be between 1 and 1024 characters in length";
} else {
    $query = "INSERT INTO `note` (`user_id`, `text`, `added`) VALUES (?, ?, ?)";
    $stmt = $mysqli->stmt_init();
    if ($stmt->prepare($query)) {
        $now = date("Y-m-d H:i:s");
        $stmt->bind_param("sss", $_SESSION['uid'], $text, $now);
        if ($stmt->execute()) {
            $stmt->close();
            $response["success"] = true;
            $response["note"] = array(
                "id" => $mysqli->insert_id,
                "text" => $text,
                "added" => $now
            );
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
