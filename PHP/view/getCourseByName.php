<?php
require('../model/MonhocDB.php');

$search = $_REQUEST["search"];

$course = new MonhocDB();
$listCourseByName = $course->getCourseByName( $search );

echo json_encode($listCourseByName);
?>