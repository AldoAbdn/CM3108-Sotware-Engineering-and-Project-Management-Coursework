<?php
	include 'connectToDb.php';
	include 'Project.php';

	$projectTable = "project";
	$imageTable = "image";
	$target_dir = "/img/";
	if (isset($_FILES['icon'])){
		$relative_url = $target_dir.basename($_FILES["icon"]["name"]);
		$target_file = $_SERVER['DOCUMENT_ROOT'].$relative_url;
		move_uploaded_file($_FILES["icon"]["tmp_name"],$target_file);
	} else {
		$relative_url = $target_dir."placeholder.png";
	}
	$sql = "UPDATE $projectTable SET Project_Name='{$_POST['name']}',Category='{$_POST['category']}',Icon='$relative_url',Description='{$_POST['description']}',Total=0,Goal='{$_POST['goal']}',Approved=0,User_ID='{$_POST['userid']}' WHERE Project_ID='{$_POST['id']}'";
	$result = $conn->query($sql);
	$projectId = mysqli_insert_id($conn);
	if (isset($_FILES['images'])){
			$count = count($_FILES['images']['name']);
		for($i = 0; $i<$count; $i++) {
			$relative_url = $target_dir.basename($_FILES['images']['name'][$i]);
			$target_file = $_SERVER['DOCUMENT_ROOT'].$relative_url;
			move_uploaded_file($_FILES['images']['tmp_name'][$i], $target_file);
			$sql = "INSERT INTO $imageTable (User_ID,Project_ID,Image) VALUES ({$_POST['userid']},'{$projectId}','{$relative_url}')";
			$result = $conn->query($sql);
		}
	}
?>