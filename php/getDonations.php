<?php
	include 'connectToDb.php';
	include 'utf8ize.php';
	include 'Donation.php';

	$projecttable = "project";

	$sql = "SELECT project.Project_Name,user_details.User_name,user_details.Email,paypal.Ammount_Donated,paypal.Trans_Code FROM paypal INNER JOIN project ON paypal.Project_ID=project.Project_ID INNER JOIN user_details ON paypal.User_ID=user_details.User_ID";
	$result = $conn->query($sql);
	$donations = array();
	while($row = $result->fetch_assoc()){
		$donations[] = new Donation(utf8ize($row['Project_Name']),utf8ize($row['User_name']),utf8ize($row['Email']),utf8ize($row['Ammount_Donated']),utf8ize($row['Trans_Code']));
	}
	
	echo json_encode(utf8ize($donations));
?>