<?php
require('../model/SinhvienDB.php');

$classID = $_REQUEST["classID"];

$student = new SinhvienDB();
$listStudent = $student->getStudentByClassID( $classID );

echo json_encode($listStudent);
?>