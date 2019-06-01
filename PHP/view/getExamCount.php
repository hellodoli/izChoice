<?php
require('../model/BoDeDB.php');

$userID = $_REQUEST["userID"];
$courseName = $_REQUEST["courseName"];

$exam = new BoDeDB();
$listExamByUser = $exam->getExamCount( $userID, $courseName );

echo json_encode($listExamByUser);
?>