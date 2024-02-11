<?php 
require_once "ModelBase.php";

class Classic extends ModelBase{
    
    function __construct(){
        //Init's table
        $this->table_name = 'highscores';

        //ModelBase's constructor class call
        parent::__construct();
    }
}
?>