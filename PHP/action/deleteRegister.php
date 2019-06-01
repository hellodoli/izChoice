<?php
require('../model/GiaoVienDKDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$classID = $_POST["classID"];
$subjectID = $_POST["subjectID"];
$time = $_POST["time"];

$res = new GiaoVienDKDB();
$command = $res->deleteRegister( $classID, $subjectID, $time );

echo json_encode($command);
?>