<?php
require('../model/BoDeDB.php');

$time = $_REQUEST["time"];
$level = $_REQUEST["level"];
$courseID = $_REQUEST["courseID"];

$exam = new BoDeDB();
$listExamID = $exam->getExamID( $time, $level, $courseID );

echo json_encode($listExamID);
?>