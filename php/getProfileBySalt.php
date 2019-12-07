<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Profile.php';

	$table = "user_details";

	if (isset($_GET['salt'])){
		$salt = $_GET['salt'];
		$sql = "SELECT * FROM $table WHERE Salt='$salt'";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$profile = new Profile(utf8ize($row['User_ID']),utf8ize($row['User_name']),utf8ize($row['Email']),utf8ize($row['Avatar']),utf8ize($row['Passwrd']),utf8ize($row['Salt']),utf8ize($row['Admin']),utf8ize($row['Approved']));
		echo json_encode(utf8ize($profile));
	}
?>