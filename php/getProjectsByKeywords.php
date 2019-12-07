<?php
	include 'connectToDB.php';
	include 'Project.php';

	if (isset($_GET['search'])){
		$search = $_GET['search'];
		$searchWords = explode(" ",$search);
		$max = count($searchWords);
		$table = "project";
		$col = "Description";
		$sql = "SELECT * FROM $table WHERE $col ";
		for ($x = 0;$x < $max;$x++){
			if ($x == 0){
				$sql .= "LIKE '%".$searchWords[$x]."%'";
			} else {
				$sql .=" OR $col LIKE '%".$searchWords[$x]."%'";
			}
		}
		$sql .= " AND Approved=1";
		$result = $conn->query($sql);
		$keywordProjects = array();
		while($row = $result->fetch_assoc()){
			$keywordProjects[] = new Project($row['Project_ID'],$row['Project_Name'],$row['Category'],$row['Icon'],$row['Description'],$row['Total'],$row['Goal'],$row['Approved']);
		}
		echo json_encode($keywordProjects);
	} else {
		echo 'Not Set';
	}

?>