<?php
require('../model/SinhvienDB.php');

$studentID = $_REQUEST["studentID"];

$student = new SinhvienDB();
$listCheckStudent = $student->checkExistStudent( $studentID );

echo json_encode($listCheckStudent);
?>