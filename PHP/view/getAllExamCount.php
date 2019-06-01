<?php
require('../model/BoDeDB.php');

$courseID = $_REQUEST["courseID"];

$exam = new BoDeDB();
$listAllExamCount = $exam->getAllExamCount( $courseID );

echo json_encode($listAllExamCount);
?>