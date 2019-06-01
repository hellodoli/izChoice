<?php
require('../model/LopDB.php');

$username = $_REQUEST["username"];

$class = new LopDB();
$listClassByUser = $class->getClassByUserName( $username );

echo json_encode($listClassByUser);
?>