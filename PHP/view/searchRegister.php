<?php
require('../model/GiaoVienDKDB.php');

$username = $_REQUEST["username"];
$subjectID = $_REQUEST["subjectID"];

$register = new GiaoVienDKDB();
$listRegister = $register->searchRegister( $username, $subjectID );

echo json_encode($listRegister);
?>