<?php
require('../model/BangdiemDB.php');

$subjectID = $_REQUEST["subjectID"];
$classID = $_REQUEST["classID"];

$score = new BangdiemDB();
$listCountScore = $score->getCountScore( $subjectID, $classID );

echo json_encode( $listCountScore );
?>