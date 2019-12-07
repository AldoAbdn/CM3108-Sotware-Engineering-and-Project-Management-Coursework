<?php
	include 'connectToDb.php';
	include 'Profile.php';
	
	$table = "user_details";
	$_POST = json_decode(file_get_contents('php://input'),true);

	if (isset($_POST['profile'])){
		$profile = $_POST['profile'];
		$sql = "INSERT INTO $table (User_name,Email,Passwrd,Avatar) VALUES ($profile->name,$profile->email,$profile->password,'/img/profile.png')";
		$result = $conn->query($sql);
		echo $result;
	}
?>