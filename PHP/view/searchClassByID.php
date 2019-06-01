<?php
require('../model/LopDB.php');

$classID = $_REQUEST["classID"];

$class = new LopDB();
$listClassByID = $class->searchClassByID( $classID );

echo json_encode($listClassByID);
?>