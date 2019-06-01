<?php
require('../model/KhoaDB.php');

$fal = new KhoaDB();
$listAllFal = $fal->getAllFal();

echo json_encode($listAllFal);
?>