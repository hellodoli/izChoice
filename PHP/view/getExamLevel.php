<?php
require('../model/BoDeDB.php');

$courseName = $_REQUEST["courseName"];
$time = $_REQUEST["time"];

$exam = new BoDeDB();
$listExamLevel = $exam->getExamLevel( $courseName, $time );

echo json_encode($listExamLevel);
?>