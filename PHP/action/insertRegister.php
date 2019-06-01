<?php
require('../model/GiaoVienDKDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$userName = $_POST["username"];
$classID = $_POST["classID"];
$subjectID = $_POST["subjectID"];
$level = $_POST["level"];
$datetime = $_POST["datetime"];
$turn = $_POST["turn"];
$count = $_POST["count"];
$duaration = $_POST["duration"];

$res = new GiaoVienDKDB();
$command = $res->insertResgister( $userName, $classID, $subjectID, $level, $datetime, $turn, $count, $duaration );

echo json_encode($command);
?>