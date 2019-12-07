<?php
	include 'connectToDb.php';
	include 'Profile.php';

	$table = "user_details";
	$_POST = json_decode(file_get_contents('php://input'),true);

	if (isset($_POST['profileid'])){
		$profileid = $_POST['profileid'];
		$sql = "UPDATE $table SET Approved=1 WHERE User_ID=$profileid";
		$result = $conn->query($sql);
		echo $result;
	}
?>