<?php
require('../model/BoDeCTDB.php');

$examIdSql = $_REQUEST["examIdSql"];
$number = $_REQUEST["number"];

$exam = new BoDeCTDB();
$listExamDetailRandom = $exam->getExamDeTailRandom( $examIdSql, $number );

echo json_encode($listExamDetailRandom);
?>