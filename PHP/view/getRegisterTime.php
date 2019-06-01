<?php
require('../model/GiaoVienDKDB.php');

$classID = $_REQUEST["classID"];
$subjectID = $_REQUEST["subjectID"];

$register = new GiaoVienDKDB();
$listRegister = $register->getRegisterTime( $classID, $subjectID );

echo json_encode($listRegister);
?>