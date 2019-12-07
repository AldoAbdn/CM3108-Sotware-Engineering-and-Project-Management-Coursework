<?php
	include 'connectToDB.php';

	$_POST = json_decode(file_get_contents('php://input'),true);
	if (isset($_POST['profileid'])){
		$table = "user_details";
		$id = $_POST['profileid'];
		$sql = "DELETE FROM $table WHERE User_ID = '$id'";
		$result = $conn->query($sql);
	}
?>