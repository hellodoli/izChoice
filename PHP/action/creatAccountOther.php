<?php
    session_start();
    require_once("../model/db.php");
    require('../model/TaikhoanDB.php');

    $loginName = $_REQUEST["loginname"];
    $password = $_REQUEST["password"];
    $userName = $_REQUEST["username"];
    $role = $_REQUEST["role"];
    $otherServer = '';

    if( $_SESSION["server"] === "PHAT-PC\PHAT1" ) {
        $otherServer = 'PHAT-PC\PHAT2';
    }else{
        $otherServer = 'PHAT-PC\PHAT1';
    }

    $tk = new TaikhoanDB($otherServer, $GLOBALS["db"], 'sa', '09121996sql');
    $command = $tk->createAccount( $loginName, $password, $userName, $role );

    echo json_encode($command);
?>