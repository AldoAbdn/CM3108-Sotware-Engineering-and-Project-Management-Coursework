<?php
	include 'connectToDB.php';
	//SET POST
	$_POST = json_decode(file_get_contents('php://input'),true);
	if (isset($_POST['projectid'])){
		//Setup
		$table = "project";
		$id = $_POST['projectid'];
		//SQL
		$sql = "DELETE FROM $table WHERE Project_ID = '$projectid'";
		$result = $conn->query($sql);
		echo($id);
	} else {
		echo "Invalid ID";
	}
?>