<?php
require('../model/GiaoVienDKDB.php');

$sbName = $_REQUEST["subjectName"];

$register = new GiaoVienDKDB();
$listRegister = $register->searchRegisterBySubjectName( $sbName );

echo json_encode($listRegister);
?>