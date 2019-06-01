<?php
require('../model/SinhvienDB.php');

$studentID = $_REQUEST["studentID"];

$student = new SinhvienDB();
$listStudent = $student->getStudentById( $studentID );

echo json_encode($listStudent);
?>