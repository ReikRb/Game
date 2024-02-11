<?php
//Resolves cors acces route denial
header("Access-Control-Allow-Origin: *");

require_once (__DIR__."/../controller/Controller.php");

$result = $classic->getAll();

//Returns result as JSON
echo json_encode($result);
?>
