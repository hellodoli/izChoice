<?php
require('../model/BoDeCTDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$content = $_POST["content"];
$a = $_POST["a"];
$b = $_POST["b"];
$c = $_POST["c"];
$d = $_POST["d"];
$examID = $_POST["examID"];
$examDetailID = $_POST["examDetailID"];

$examDetail = new BoDeCTDB();
$command = $examDetail->updateExamDeTail( $content, $a, $b, $c, $d, $examID, $examDetailID );

echo json_encode($command);
?>