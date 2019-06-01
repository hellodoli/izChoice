<?php
require('../model/GiaovienDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$teacherID = $_POST["teacherID"];
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$d = $_POST["d"];
$falID = $_POST["falID"];

$teacher = new GiaoVienDB();
$command = $teacher->insertTeacher( $teacherID, $firstName, $lastName, $d, $falID );

echo json_encode($command);
?>