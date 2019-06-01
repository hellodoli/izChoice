<?php
require('../model/BoDeCTDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$examID = $_POST["examID"];
$examDetailID = $_POST["examDetailID"];

$examDetail = new BoDeCTDB();
$command = $examDetail->deleteExamDeTail( $examID, $examDetailID );

echo json_encode($command);
?>