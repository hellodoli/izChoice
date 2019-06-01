<?php
require('../model/TaikhoanDB.php');

$username = $_REQUEST["username"];

$tk = new TaikhoanDB();
$check = $tk->checkExistUserName( $username );

echo json_encode($check);
?>