<?php
require('../model/GiaoVienDB.php');

$d = $_REQUEST["d"];

$teacher = new GiaoVienDB();
$listTeacher = $teacher->searchTeacherByD( $d );

echo json_encode($listTeacher);
?>