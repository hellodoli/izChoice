<?php
require('../model/SinhvienDB.php');

$classID = $_REQUEST["classID"];
$username = $_REQUEST["username"];

$student = new SinhvienDB();
$listStudent = $student->getStudentByTeacher( $classID, $username );

echo json_encode($listStudent);
?>