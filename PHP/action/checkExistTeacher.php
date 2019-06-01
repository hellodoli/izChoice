<?php
require('../model/GiaovienDB.php');

$teacherID = $_REQUEST["teacherID"];

$teacher = new GiaovienDB();
$listCheckTeacher = $teacher->checkExistTeacher( $teacherID );

echo json_encode($listCheckTeacher);
?>