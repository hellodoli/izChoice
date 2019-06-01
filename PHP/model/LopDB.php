<?php
require_once("db.php");

class LopDB {

    private $con;

    public function __construct() {
        $this -> con = new Connection();
    }

    public function getClassByUserName( $username ) {
        try{
            $sql = "SELECT l.MaLop, l.TenLop 
            FROM Khoa k, Lop l, Giaovien gv
            where k.MaKhoa = gv.MaKhoa and
            k.MaKhoa = l.MaKhoa and
            gv.MaGV =:teacherID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID',$username);
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

    public function getClassByID( $classID ) {
        try{
            $sql = "SELECT l.MaLop, l.TenLop, l.MaKhoa
            FROM Khoa k, Lop l
            where k.MaKhoa = l.MaKhoa and
            l.MaLop =:classID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID',$classID);
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

    public function getAllClass() {
        try{
            $sql = "SELECT l.MaLop, l.TenLop 
            FROM Khoa k, Lop l
            where k.MaKhoa = l.MaKhoa";
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

    //search
    public function searchClassByID( $classID ){
        try{
            $sql = "SELECT MaLop, TenLop
            FROM Lop
            WHERE MaLop LIKE CONCAT('%', :classID ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID',$classID);
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

    public function searchClassByName( $className ){
        try{
            $sql = "SELECT MaLop, TenLop
            FROM Lop
            WHERE TenLop LIKE CONCAT('%', :className ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':className',$className);
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

    public function checkExistClass( $classID ){
        try{
            $sql = "SELECT * FROM Lop WHERE MaLop =:classID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID',$classID);
            $status = $this -> con -> execute();
            if ($status) {
                return $this -> con -> rowCount();
            } else {
                return false;
            }
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    // update
    public function updateClass( $className, $classID ) {
        try{
            $sql = "UPDATE Lop SET TenLop =:className WHERE MaLop =:classID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':className',$className);
            $this -> con -> bind(':classID',$classID);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    // insert
    public function insertClass( $classID, $className, $falID ) {
        try{
            $sql = "INSERT INTO Lop (MaLop, TenLop, Makhoa) VALUES (:classID, :className, :falID)";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID',$classID);
            $this -> con -> bind(':className',$className);
            $this -> con -> bind(':falID',$falID);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }
}
?>