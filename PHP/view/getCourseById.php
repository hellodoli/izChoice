<?php
require('../model/MonhocDB.php');

$id = $_REQUEST["id"];

$course = new MonhocDB();
$listCourseById = $course->getCourseById( $id );

echo json_encode($listCourseById);
?>