<?php
require('../model/TaikhoanDB.php');

$loginname = $_REQUEST["loginname"];

$tk = new TaikhoanDB();
$check = $tk->checkExistLoginName( $loginname );

echo json_encode($check);
?>