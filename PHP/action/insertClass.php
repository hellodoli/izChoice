<?php
require('../model/LopDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$classID = $_POST["classID"];
$className = $_POST["className"];
$falID = $_POST["falID"];

$class = new LopDB();
$command = $class->insertClass( $classID, $className, $falID );

echo json_encode($command);
?>