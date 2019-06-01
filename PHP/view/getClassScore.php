<?php
require('../model/BangdiemDB.php');

$subjectID = $_REQUEST["subjectID"];

$score = new BangdiemDB();
$listClassScore = $score->getClassScore( $subjectID );

echo json_encode( $listClassScore );
?>