<?php
require('../model/BoDeCTDB.php');

$examID = $_REQUEST["examID"];
$username = $_REQUEST["username"];

$exam = new BoDeCTDB();
$listExamDetail = $exam->getExamDeTailByExamIdAndUser( $examID, $username );

echo json_encode($listExamDetail);
?>