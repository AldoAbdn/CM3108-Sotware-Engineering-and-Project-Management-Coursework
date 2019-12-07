<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Profile.php';

	$table = "user_details";
	$target_dir = "/img/";
	if (isset($_FILES['icon'])){
		$relative_url = $target_dir . basename($_FILES["icon"]["name"]);
		$target_file =  $_SERVER['DOCUMENT_ROOT'].$relative_url;
		move_uploaded_file($_FILES["icon"]["tmp_name"], $target_file);
	} else {
		$relative_url = $target_dir."profile.png";
	}
	if ($_POST['password'] != ""){
		$sql = "UPDATE $table SET User_name='{$_POST['name']}',Email='{$_POST['email']}',Avatar='$relative_url',Passwrd='{$_POST['password']}' WHERE User_ID='{$_POST['id']}'";
	} else {
		$sql = "UPDATE $table SET User_name='{$_POST['name']}',Email='{$_POST['email']}',Avatar='$relative_url' WHERE User_ID='{$_POST['id']}'";
	}
	
    $result = $conn->query($sql);
?>