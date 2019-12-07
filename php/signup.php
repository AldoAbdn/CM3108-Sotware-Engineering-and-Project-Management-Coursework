<?php
	include 'connectToDb.php';

	//Set POST
	$_POST = json_decode(file_get_contents('php://input'),true);
	//Setup
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	$table = "user_details";
	//SQL
	$sql = "SELECT * FROM $table WHERE Email='{$email}'";
	$result = $conn->query($sql);
	if($result->num_rows == 1){
		exit("exists");
	}
	$sql = "INSERT INTO $table (User_name,Email,Passwrd,Avatar,Admin,Approved) VALUES ('{$username}','{$email}','{$password}','/img/profile.png',0,NULL)";
	$result = $conn->query($sql);
	if($result == ""){
		exit("failed");
	} else {
		$id = mysqli_insert_id($conn);
		$salt = md5(date("Y-m-d h:i:sa"+$id));
		$sql = "UPDATE $table SET Salt='{$salt}' WHERE User_ID = '{$id}'";
		$result = $conn->query($sql);
		if ($result){
			echo $salt;
		} else {
			exit("failed");
		}
	}
?>