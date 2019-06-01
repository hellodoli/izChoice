<?php
require_once('../config/config.php');

$GLOBALS["db"] = "thitracnghiem";

class Connection {

    private $pdo;
    private $stmt;
    private $err;

    private $host = DB_HOST;
    private $dbname = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASSWORD;
    

    public function __construct() {
        $dsn = "mysql:host=$this->host;dbname=$this->dbname;charset=utf8";
        $options = array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
        try {
            $this -> pdo = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $e) {
            $this -> err = $e->getMessage();
            echo $this -> err;
        }
    }

    public function getConnection() {
        return $this->pdo;
    }

    public function close() {
        $this->pdo = null;
    }

    public function prepare($sql) {
        $this -> stmt = $this -> pdo -> prepare($sql);
    }

    public function bind($param, $value, $type= null) {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NUL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this -> stmt -> bindValue($param,$value,$type);
    }

    public function execute() {
        return $this -> stmt -> execute();
    }

    public function resultSet() {
        //$this->execute();
        return $this -> stmt -> fetchAll(PDO::FETCH_OBJ);
    }

    public function resultSingle() {
        //$this->execute();
        return $this -> stmt -> fetch(PDO::FETCH_OBJ);
    }

    public function rowCount() {
        return $this -> stmt -> rowCount();
    }

    public function beginTransaction(){
        return $this -> pdo -> beginTransaction();
    }

    public function exec($sql){
        return $this -> pdo ->exec($sql);
    }

    public function commit(){
        return $this -> pdo-> commit();
    }
}