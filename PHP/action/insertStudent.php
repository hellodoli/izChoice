<?php
require('../model/SinhvienDB.php');
$_POST = json_decode(file_get_contents("php://input"),true);

$studentID = $_POST["studentID"];
$classID = $_POST["classID"];
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$birth = $_POST["birth"];
$address = $_POST["address"];

$student = new SinhvienDB();
$command = $student->insertStudent( $studentID, $classID, $firstName, $lastName, $birth, $address );

echo json_encode($command);
?>