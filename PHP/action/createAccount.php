<?php
require('../model/TaikhoanDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$loginName = $_POST["loginname"];
$password = $_POST["password"];
$userName = $_POST["username"];
$role = $_POST["role"];

$tk = new TaikhoanDB();
$command = $tk->createAccount( $loginName, $password, $userName, $role );

echo json_encode($command);
?>