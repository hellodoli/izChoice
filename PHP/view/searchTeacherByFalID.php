<?php
require('../model/GiaoVienDB.php');

$falID = $_REQUEST["falID"];

$teacher = new GiaoVienDB();
$listTeacher = $teacher->searchTeacherByFalID( $falID );

echo json_encode($listTeacher);
?>