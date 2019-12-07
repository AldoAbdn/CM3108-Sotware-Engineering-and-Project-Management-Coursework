<?php
	include 'connectToDB.php';
	include 'Project.php';

	$table = "project";
	$col = "Views";
	if (isset($_GET['category'])){
		$category = $_GET['category'];
		if ($category == 'all'){
			$sql = "SELECT * FROM $table WHERE Approved=1 ORDER BY $col DESC LIMIT 4";
		} else {
			$sql = "SELECT * FROM $table WHERE Category='$category' AND Approved=1 ORDER BY $col DESC LIMIT 4";
		}
		
		$result = $conn->query($sql);
		$popularProjects = array();
		while($row = $result->fetch_assoc()){
			$popularProjects[] = new Project($row['Project_ID'],$row['Project_Name'],$row['Category'],$row['Icon'],$row['Description'],$row['Total'],$row['Goal'],$row['Approved'],$row['User_ID']);
		}
		echo json_encode($popularProjects);
	}

?>