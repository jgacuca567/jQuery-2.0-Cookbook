<?php
	$categories = array(
		'colours' => array(
			"title" => "Colours",
			"description" => "Some of my favorite colours",
			"items" => array(
				"Black",
				"Green",
				"Red",
				"Blue",
				"Purple"
				)
			),
			'shapes' => array(
				"title" => "Shapes",
				"description" => "Some shapes I really like",
				"items" => array(
					"Triangle",
					"Circle",
					"Square"
				)
			),
			"sounds" => array(
				"title" => "Sounds",
				"description" => "Some crazy sounds",
				"items" => array(
					"Buzz",
					"Swish",
					"Boom!",
					"Tick"
					)
				)
		);
	if (isset($_POST['category'])) {
		$response = array(
			'success' => true,
			'data' => array()
		);
		$category = $_POST['category'];
		if (isset($categories[$category])) {
			$response["data"] = $categories[$category];
		} else{
			$response["success"] = false;
			$response["data"] = "Invalid category provided";
		}
		header("Content-Type: application/json; charset-UTF-8");
		echo json_encode($response);
	}
?>
