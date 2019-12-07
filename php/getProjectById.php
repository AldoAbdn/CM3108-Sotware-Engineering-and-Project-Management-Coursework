<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Project.php';

	$table = "project";

	if (isset($_GET['projectid'])){
		$projectid = $_GET['projectid'];
		$sql = "UPDATE $table SET Views = Views + 1 WHERE Project_ID=$projectid";
		$result = $conn->query($sql);
		$sql = "SELECT * FROM $table WHERE Project_ID=$projectid";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();
		$project = new Project(utf8ize($row['Project_ID']),utf8ize($row['Project_Name']),utf8ize($row['Category']),utf8ize($row['Icon']),utf8ize($row['Description']),utf8ize($row['Total']),utf8ize($row['Goal']),utf8ize($row['Approved']),utf8ize($row['User_ID']));
		echo json_encode(utf8ize($project));
	}
?>