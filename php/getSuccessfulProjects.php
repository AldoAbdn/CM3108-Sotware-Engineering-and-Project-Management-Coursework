<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Project.php';

	$table = "project";

	$sql = "SELECT * FROM $table WHERE Total>Goal";
	$result = $conn->query($sql);
	echo mysqli_error($conn);
	while($row = $result->fetch_assoc()){
		$projects[] = new Project(utf8ize($row['Project_ID']),utf8ize($row['Project_Name']),utf8ize($row['Category']),utf8ize($row['Icon']),utf8ize($row['Description']),utf8ize($row['Total']),utf8ize($row['Goal']),utf8ize($row['Approved']),utf8ize($row['User_ID']));
	}
	
	echo json_encode(utf8ize($projects));
?>