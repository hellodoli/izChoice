<?php
require('../model/LopDB.php');

$classID = $_REQUEST["classID"];

$class = new LopDB();
$listCheckClass = $class->checkExistClass( $classID );

echo json_encode($listCheckClass);
?>