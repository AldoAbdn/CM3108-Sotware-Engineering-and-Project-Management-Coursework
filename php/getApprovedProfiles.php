<?php
	include 'connectToDB.php';
	include 'utf8ize.php';
	include 'Profile.php';

	//Setup
	$table = "user_details";
	$col = "User_ID";
	//SQL
	$sql = "SELECT * FROM $table WHERE Approved=1";
	$result = $conn->query($sql);
	$profiles = array();
	while($row = $result->fetch_assoc()){
		$profiles[] = new Profile(utf8ize($row['User_ID']),utf8ize($row['User_name']),utf8ize($row['Email']),$row['Avatar'],utf8ize($row['Passwrd']),utf8ize($row['Salt']),utf8ize($row['Admin']),utf8ize($row['Approved']));
	}
	echo json_encode($profiles);
?>