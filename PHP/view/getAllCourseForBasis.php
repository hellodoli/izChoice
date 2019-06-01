<?php
require('../model/MonhocDB.php');

$course = new MonhocDB();
$listAllCourseBasis = $course->getAllCourseForBasis();

echo json_encode($listAllCourseBasis);
?>