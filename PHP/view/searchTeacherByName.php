<?php
require('../model/GiaoVienDB.php');

$name1 = $_REQUEST["name1"];
$name2 = $_REQUEST["name2"];

$teacher = new GiaoVienDB();
$listTeacher = $teacher->searchTeacherByName( $name1, $name2 );

echo json_encode($listTeacher);
?>