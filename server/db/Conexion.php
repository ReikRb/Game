<?php 
//Classes heritage Class
//Connects pg4admin & singleton
require_once "login_data.php";

class Conexion {
    private static $_singleton = null;
    private $dbh;
    private $errno;
    private $num_rows;

    public static function getInstance() {

        if (is_null(self::$_singleton)) {
            self::$_singleton = new self();
        }

        return self::$_singleton;
    }

    private function __clone(){
        trigger_error('Cant clone this object', E_USER_ERROR);
    }

    public function __wakeup(){
        trigger_error("Cant de-serialize an instance from" . get_class($this) . " class.", E_USER_ERROR);
    }

    private function __construct(){
        global $cfg;

        $db       = $cfg['nombre_bd'];
        $host     = $cfg['servidor'];
        $port     = $cfg['port'];
        $user     = $cfg['usuario'];
        $pass     = $cfg['password'];

        $connectionStr ='host=ep-snowy-hill-a2b4lgn2-pooler.eu-central-1.aws.neon.tech port=5432 dbname=scores user=unai.roca password=RLv3DMOFl2fI ';
        $this->dbh = pg_connect($connectionStr);
        if (!$this->dbh) {
            die("Fatal error while connecting to DB");
        }
        ////Unquote for texting.
        // else
        // echo "Connection OK <br>";

    }

    public function getConnection(){
        return self::$_singleton;
    }

    public function close(){
        self::$_singleton->close();
    }

    protected function query($sql){

        $result = pg_query($this->dbh, $sql);
        if (!$result) {
            echo "Error: " . $sql . "<br>" . $this->dbh.pg_last_error();
            die ("Fatal error while executing query");
        } else {
            // echo "todo +";
        }

        return $result;
    }

}
?>