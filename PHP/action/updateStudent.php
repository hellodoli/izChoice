<?php
require('../model/SinhvienDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$address = $_POST["address"];
$birth = $_POST["birth"];
$studentID = $_POST["studentID"];

$student = new SinhvienDB();
$command = $student->updateStudent( $firstName, $lastName, $address, $birth, $studentID );

echo json_encode($command);
?>