<?php
require('../model/BoDeDB.php');

$examID = $_REQUEST["examID"];

$exam = new BoDeDB();
$listCheckExam = $exam->checkExistExam( $examID );

echo json_encode($listCheckExam);
?>