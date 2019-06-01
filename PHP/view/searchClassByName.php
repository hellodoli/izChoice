<?php
require('../model/LopDB.php');

$className = $_REQUEST["className"];

$class = new LopDB();
$listClassByName = $class->searchClassByName( $className );

echo json_encode($listClassByName);
?>