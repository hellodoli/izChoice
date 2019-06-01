<?php
require('../model/MonhocDB.php');

$course = new MonhocDB();
$listAllCourse = $course->getAllCourse();

echo json_encode($listAllCourse);
?>