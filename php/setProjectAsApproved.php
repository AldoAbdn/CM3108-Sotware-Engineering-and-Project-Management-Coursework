<?php
	include 'connectToDb.php';
	include 'Project.php';

	$table = "project";
	$_POST = json_decode(file_get_contents('php://input'),true);

	if (isset($_POST['projectid'])){
		$projectid = $_POST['projectid'];
		$sql = "UPDATE $table SET Approved=1 WHERE Project_ID=$projectid";
		$result = $conn->query($sql);
		echo $result;
	}
?>