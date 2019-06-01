<?php
require('../model/BoDeDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$examDetailSQL = $_POST["examDetailSQL"];

$exam = new BoDeDB();
$command = $exam->insertExamDetail( $examDetailSQL );

echo json_encode($command);
?>