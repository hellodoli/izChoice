<?php
require('../model/LopDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$className = $_POST["className"];
$classID = $_POST["classID"];

$class = new LopDB();
$command = $class->updateClass( $className, $classID );

echo json_encode($command);
?>