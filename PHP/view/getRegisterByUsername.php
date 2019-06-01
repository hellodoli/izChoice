<?php
require('../model/GiaoVienDKDB.php');

$username = $_REQUEST["username"];

$register = new GiaoVienDKDB();
$listRegister = $register->getRegisterByUsername( $username );

echo json_encode($listRegister);
?>