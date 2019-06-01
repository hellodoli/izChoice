<?php
require('../model/BoDeCTDB.php');

$examID = $_REQUEST["examID"];
$courseID = $_REQUEST["courseID"];
$time = $_REQUEST["time"];

$exam = new BoDeCTDB();
$listExamDetail = $exam->getExamDeTailByEnrol( $examID, $courseID, $time );

echo json_encode($listExamDetail);
?>