<?php
require('../model/GiaoVienDKDB.php');

$register = new GiaoVienDKDB();
$listRegister = $register->getAllRegister();

echo json_encode($listRegister);

?>