<?php
require('../model/BoDeCTDB.php');

$examID = $_REQUEST["examID"];

$exam = new BoDeCTDB();
$listExamDetail = $exam->getExamDeTailByExamId( $examID );

echo json_encode($listExamDetail);
?>