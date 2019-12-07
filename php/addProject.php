<?php
	include 'connectToDb.php';
	include 'Project.php';
	//Altervista Support
	$conn = mysqli_connect($servername,$username,$password,$db); 
    mysqli_select_db($conn,"my_campusfunder");
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
	$sql = "INSERT INTO $projectTable(Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('{$_POST['name']}','{$_POST['category']}','$relative_url','{$_POST['description']}',0,'{$_POST['goal']}',0,'{$_POST['userid']}',0,0)";
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
	};	
?>