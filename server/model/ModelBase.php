<?php 

require_once (__DIR__."/../db/Conexion.php");
class ModelBase extends Conexion{
    protected $conexion;
    protected $table_name;


    function __construct(){
        $this->conexion = parent::getInstance();
    }

    //Shows all elements
    function getAll(){
        $query = $this->selectDB($this->table_name);

        $result = $this->conexion->query($query);
        $array = $this->createArray($result);

        return $array;
    }
    
    //Shows all table's element, filtered by a  column value
    function getAllByColumn($search_name, $search_value){
        $query = $this->selectDB($this->table_name, "*", $search_name, $search_value);
        $result = $this->conexion->query($query);

        $array = $this->createArray($result);

        $result->close();
        return $array;
    }

    //Adds new element to table
    function addNew($array){
        $query = $this->insertDB($this->table_name, $array);
        echo $query;
        $result = $this->conexion->query($query);

        return $result;
    }

    protected function createArray($data){
        $array = [];
        while($row = pg_fetch_assoc($data)){
            $array[] = $row;
        }

        return $array;
    }

    //Returns Query: "SELECT -columns- FROM -table- WHERE -name- = -value-"
    //$table: table's name
    //$columns: Extraction tables
    //$name & $value: WHERE conditional parameters
    protected function selectDB($table, $columns = "*", $name = "", $value = ""){

        $query = "SELECT $columns FROM $table";
        if ($name != "" && $value != "" ) 
            $query .= " WHERE $name = '$value'";

        $query .= " order by score DESC";
        //echo $query
        return $query;
    }

    //Returns Query "INSERT INTO -table- (author, title, category) VALUE ('-name-', '-value-')
    //$table: table's name
    //$array: Associative array that matches column and value
    protected function insertDB($table,$array){
        foreach($array as $name => $value){
            $insert_name[]  = $name;
            $insert_value[] = $value;
        }
        $query = "INSERT INTO $table(";

        $num_elem = count($insert_name);
        $temp ="";
        for ($i=0; $i < $num_elem; $i++) { 
            //Parameters
            $query.= "$insert_name[$i]";
            $query .= $i != $num_elem-1 ? ", " : ") ";

            //Arguments
            // $temp .= "'$insert_value[$i]'";
            // $temp .= $i != $num_elem-1 ? ", " : ") ";
        }
        // $query .= "VALUES("+$temp;


        $query .= "VALUES(";

        //ARGUMENTS
        for ($i=0; $i < $num_elem; $i++) { 
            $query.= "'$insert_value[$i]'";

            $query .= $i != $num_elem-1 ? ", " : ") ";
        }

        return $query;
    }

}




?>