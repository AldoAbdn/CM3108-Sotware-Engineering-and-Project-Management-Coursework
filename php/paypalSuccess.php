<?php
	include 'connectToDb.php';

	$_POST = json_decode(file_get_contents('php://input'),true);
	$userID = $_POST['userid'];
	$projectID = $_POST['projectid'];
	$amount = $_POST['amount'];
	$transactionId = $_POST['transid'];

	$sql = "UPDATE project SET Total = Total + $amount WHERE Project_ID=$projectID";
	$result = $conn->query($sql);
	echo mysqli_error($conn);
	$sql = "INSERT INTO paypal VALUES ('$transactionId','$userID','$projectID','$amount')";
	$result = $conn->query($sql);
	echo mysqli_error($conn);
?>