<?php
require('../model/BangdiemDB.php');

$score = new BangdiemDB();
$listSubjectScore = $score->getSubjectScore();

echo json_encode( $listSubjectScore );
?>