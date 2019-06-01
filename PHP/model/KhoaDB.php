<?php
require_once("db.php");

class KhoaDB {

    private $con;

    public function __construct() {
        $this -> con = new Connection();
    }

    // get tất cả mã khoa
    public function getAllFal( ) {
        try{
            $sql = "SELECT Makhoa, Tenkhoa from Khoa";
            $this -> con -> prepare($sql);
            $status = $this -> con -> execute();
            $this -> con -> close();
            if ($status) {
                $count = $this -> con -> rowCount();
                if ($count > 0) {
                    return $this -> con -> resultSet();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }
}
?>