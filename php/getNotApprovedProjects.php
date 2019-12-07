<?php
	include 'connectToDB.php';
	include 'Project.php';

	//Setup
	$table = "project";
	$col = "Project_ID";
	//SQL
	$sql = "SELECT * FROM $table WHERE Approved=0";
	$result = $conn->query($sql);
	$projects = array();
	while($row = $result->fetch_assoc()){
		$projects[] = new Project($row['Project_ID'],$row['Project_Name'],$row['Category'],$row['Icon'],$row['Description'],$row['Total'],$row['Goal'],$row['Approved']);
	}
	echo json_encode($projects);
?>