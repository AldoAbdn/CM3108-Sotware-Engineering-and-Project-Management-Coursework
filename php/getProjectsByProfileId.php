<?php
	include 'connectToDB.php';
	include 'Project.php';

	if (isset($_GET['profileid'])){
		$profileid = $_GET['profileid'];
		$table = "project";
		$col = "User_ID";
		$sql = "SELECT * FROM $table WHERE $col = $profileid";
		$result = $conn->query($sql);
		$projects = array();
		while($row = $result->fetch_assoc()){
			$projects[] = new Project($row['Project_ID'],$row['Project_Name'],$row['Category'],$row['Icon'],$row['Description'],$row['Total'],$row['Goal'],$row['Approved'],$row['User_ID']);
		}
		echo json_encode($projects);
	} else {
		echo 'Not Set';
	}
?>