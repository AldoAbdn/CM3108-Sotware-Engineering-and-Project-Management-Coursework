<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Project.php';

	//SETUP
	$table = "paypal";
	$table2 = "project";

	if (isset($_GET['profileid'])){
		$profileid = $_GET['profileid'];
		//SQL
		$sql = "SELECT * FROM $table WHERE User_ID=$profileid";
		$result = $conn->query($sql);
		$projects = array();
		while($project = $result->fetch_assoc()){
			$sql = "SELECT * FROM $table2 WHERE Project_ID='{$project['Project_ID']}'";
			$result2 = $conn->query($sql);
			$row = $result2->fetch_assoc();
			$projects[] = new Project(utf8ize($row['Project_ID']),utf8ize($row['Project_Name']),utf8ize($row['Category']),utf8ize($row['Icon']),utf8ize($row['Description']),utf8ize($row['Total']),utf8ize($row['Goal']),utf8ize($row['Approved']),utf8ize($row['User_ID']));
		}
		echo json_encode(utf8ize($projects));
	}
?>