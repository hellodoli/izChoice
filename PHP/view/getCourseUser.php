<?php
require('../model/MonhocDB.php');

$username = $_REQUEST["username"];

$course = new MonhocDB();
$listCourse = $course->getCourseByUsername( $username );

echo json_encode($listCourse);
?>