<?php
require('../model/BangdiemDB.php');

$username = $_REQUEST["username"];
$subjectID = $_REQUEST["subjectID"];

$score = new BangdiemDB();
$listCheckExistTime = $score->checkExistTime( $username, $subjectID );

echo json_encode($listCheckExistTime);
?>