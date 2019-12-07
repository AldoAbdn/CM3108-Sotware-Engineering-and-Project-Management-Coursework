<?php
	include 'connectToDB.php';
	include 'Project.php';

	//Setup
	$table = "project";
	$col = "Views";
	if (isset($_GET['category'])){
		$category = $_GET['category'];
		//SQL
		if ($category == 'all'){
			$sql = "SELECT * FROM $table WHERE Approved=1 AND Featured=0 ORDER BY $col DESC";
		} else {
			$sql = "SELECT * FROM $table WHERE Category='$category' AND Approved=0 AND Featured=0 ORDER BY $col DESC";
		}
		$result = $conn->query($sql);
		$featuredProjects = array();
		while($row = $result->fetch_assoc()){
			$featuredProjects[] = new Project($row['Project_ID'],$row['Project_Name'],$row['Category'],$row['Icon'],$row['Description'],$row['Total'],$row['Goal'],$row['Approved']);
		}
		echo json_encode($featuredProjects);
	}
?>