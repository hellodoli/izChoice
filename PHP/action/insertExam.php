<?php
require('../model/BoDeDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$examID = $_POST["examID"];
$courseID = $_POST["courseID"];
$username = $_POST["username"];
$level = $_POST["level"];
$time = $_POST["time"];

$exam = new BoDeDB();
$command = $exam->insertExam( $examID, $courseID, $username, $level, $time );

echo json_encode($command);
?>