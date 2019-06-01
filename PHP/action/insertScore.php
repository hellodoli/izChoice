<?php
require('../model/BangdiemDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$username = $_POST["username"];
$subjectID = $_POST["subjectID"];
$examID = $_POST["examID"];
$time = $_POST["time"];
$datetime = $_POST["datetime"];
$scoreReal = $_POST["scoreReal"];
$content = $_POST["content"];

$score = new BangdiemDB();
$command = $score->insertScore( $username, $subjectID, $examID, $time, $datetime, $scoreReal, $content );

echo json_encode($command);
?>