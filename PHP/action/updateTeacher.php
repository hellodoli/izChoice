<?php
require('../model/GiaovienDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$d = $_POST["d"];
$teacherID = $_POST["teacherID"];

$teacher = new GiaovienDB();
$command = $teacher->updateTeacher( $firstName, $lastName, $d, $teacherID );

echo json_encode($command);
?>