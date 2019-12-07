<?php
	include 'connectToDb.php';
	//Get POST
	$_POST = json_decode(file_get_contents('php://input'),true);
	//Setup
	$table = 'user_details';
	$email = $_POST['email'];
	$password = $_POST['password'];
	//SQL
	$sql = "SELECT * FROM $table WHERE Email = '$email' AND Passwrd = '$password'";
	$result = $conn->query($sql);
	if ($result->num_rows == 1){
		$row = $result->fetch_assoc();
		$id = $row['User_ID'];
		$salt = md5(date("Y-m-d h:i:sa"+$row['User_ID']));
		$sql = "UPDATE $table SET Salt='{$salt}' WHERE User_ID = '{$id}'";
		$result = $conn->query($sql);
		if ($result){
			echo $salt;
		} else {
			echo "failed";
		}
	} else {
		echo 'failed';
	}
?>