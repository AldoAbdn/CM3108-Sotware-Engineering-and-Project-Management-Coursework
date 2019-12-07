<?php
	include 'connectToDB.php';
	include 'Project.php';

	if (isset($_GET['search'])){
		$search = $_GET['search'];
		$search = $search."%";
		$table = "project";
		$col = "Project_Name";
		$sql = "SELECT * FROM $table WHERE $col LIKE '$search' AND Approved=1";
		$result = $conn->query($sql);
		$nameProjects = array();
		while($row = $result->fetch_assoc()){
			$nameProjects[] = new Project($row['Project_ID'],$row['Project_Name'],$row['Category'],$row['Icon'],$row['Description'],$row['Total'],$row['Goal'],$row['Approved'],$row['User_ID']);
		}
		echo json_encode($nameProjects);
	} else {
		echo 'Not Set';
	}
?>