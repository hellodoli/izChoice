<?php
require('../model/GiaoVienDB.php');

$teacher = new GiaoVienDB();
$listTeacher = $teacher->getAllTeacher();

echo json_encode($listTeacher);
?>