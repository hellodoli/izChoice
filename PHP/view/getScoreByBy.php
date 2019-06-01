<?php
require('../model/BangdiemDB.php');

$subjectID = $_REQUEST["subjectID"];
$classID = $_REQUEST["classID"];
$count = $_REQUEST["count"];

$score = new BangdiemDB();
$listScore = $score->getScoreByBy( $subjectID, $classID, $count );

echo json_encode( $listScore );
?>