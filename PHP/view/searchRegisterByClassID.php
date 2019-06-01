<?php
require('../model/GiaoVienDKDB.php');

$classID = $_REQUEST["classID"];

$register = new GiaoVienDKDB();
$listRegister = $register->searchRegisterByClassID( $classID );

echo json_encode($listRegister);
?>