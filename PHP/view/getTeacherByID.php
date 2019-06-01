<?php
require('../model/GiaoVienDB.php');

$teacherID = $_REQUEST["teacherID"];

$teacher = new GiaoVienDB();
$listTeacher = $teacher->getTeacherByID( $teacherID );

echo json_encode($listTeacher);
?>