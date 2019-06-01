<?php
require('../model/GiaoVienDKDB.php');

$date = $_REQUEST["date"];

$register = new GiaoVienDKDB();
$listRegister = $register->searchRegisterByDate( $date );

echo json_encode($listRegister);
?>