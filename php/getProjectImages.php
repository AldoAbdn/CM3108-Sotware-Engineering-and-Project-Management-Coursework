<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Image.php';

	$table = "image";

	if (isset($_GET['projectid'])){
		$projectid = $_GET['projectid'];
		$sql = "SELECT * FROM $table WHERE Project_ID='$projectid'";
		$result = $conn->query($sql);
		$images = array();
		while($row = $result->fetch_assoc()){
			$images[] = new Image($row['Image_ID'],$row['User_ID'],$row['Project_ID'],$row['Image']);
		}
		echo json_encode($images);
	}
?>