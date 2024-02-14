<?php 
header("Access-Control-Allow-Origin: *");

require_once(__DIR__."/../controller/Controller.php");
// $_POST['id']   = 23;
// $_POST['name'] = 'URB';
// $_POST['score']  = 20000;


if (
    // isset($_POST['id'])     &&
    isset($_POST['name'])     && 
    isset($_POST['score'])         
) {
    //Creates new Object Classic while its received all DATA from POST
    // $newClassic['id']   = $_POST['id'];
    $newClassic['name']   = $_POST['name'];
    $newClassic['score']    = $_POST['score'];

    //Adds new OBJ to DB
    $returnValue = $classic->addNew($newClassic);

    // echo $returnValue;
    if ($returnValue == FALSE) {
        echo "Error trying to introduce new element to DB.";

    } else{
        echo json_encode($newClassic);

    }
} else {
    die("Forbidden");
}


?>