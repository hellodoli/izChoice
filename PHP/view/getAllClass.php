<?php
require('../model/LopDB.php');

$class = new LopDB();
$listAllClass = $class->getAllClass();

echo json_encode($listAllClass);
?>