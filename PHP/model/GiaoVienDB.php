<?php
require_once("db.php");

class GiaoVienDB {

    private $con;

    public function __construct() {
        $this -> con = new Connection();
    }

    public function getTeacherByID( $teacherID ){
        try{
            $sql = "SELECT MaGV, MaKhoa, Ho, Ten, Hocvi
            FROM Giaovien
            WHERE MaGV =:teacherID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID',$teacherID);
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
            $this -> con -> prepare($sql);
            return $e->getMessage();
        }
    }

    public function getAllTeacher() {
        try{
            $sql = "SELECT MaGV, MaKhoa, Ho, Ten, Hocvi FROM Giaovien";
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

    // For search
    public function searchTeacherByID( $teacherID ){
        try{
            $sql = "SELECT MaGV, MaKhoa, Ho, Ten, Hocvi
            FROM Giaovien
            WHERE MaGV LIKE CONCAT('%', :teacherID ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID',$teacherID);
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

    public function searchTeacherByFalID( $falID ){
        try{
            $sql = "SELECT MaGV, MaKhoa, Ho, Ten, Hocvi
            FROM Giaovien
            WHERE MaKhoa LIKE CONCAT('%', :falID ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':falID',$falID);
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

    public function searchTeacherByD( $d ){
        try{
            $sql = "SELECT MaGV, MaKhoa, Ho, Ten, Hocvi
            FROM Giaovien
            WHERE Hocvi LIKE CONCAT('%', :d ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':d',$d);
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

    public function searchTeacherByName( $name1, $name2 ){
        try{
            $sql = "SELECT MaGV, MaKhoa, Ho, Ten, Hocvi
            FROM Giaovien
            WHERE Ho LIKE CONCAT('%', :name1 ,'%') or Ten LIKE CONCAT('%', :name2 ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':name1',$name1);
            $this -> con -> bind(':name2',$name2);
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

    //Update
    public function updateTeacher( $firstName, $lastName, $d, $teacherID ) {
        try{
            $sql = "UPDATE Giaovien SET Ho =:firstName , Ten =:lastName, Hocvi =:d WHERE MaGV =:teacherID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':firstName',$firstName);
            $this -> con -> bind(':lastName',$lastName);
            $this -> con -> bind(':d',$d);
            $this -> con -> bind(':teacherID',$teacherID);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function checkExistTeacher( $teacherID ){
        try{
            $sql = "SELECT * FROM Giaovien WHERE MaGV =:teacherID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID',$teacherID);
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

    //Insert
    public function insertTeacher( $teacherID, $firstName, $lastName, $d, $falID ) {
        try{
            $sql = "INSERT INTO Giaovien (MaGV, Ho, Ten, Hocvi, MaKhoa) VALUES (:teacherID, :firstName, :lastName, :d, :falID)";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID',$teacherID);
            $this -> con -> bind(':firstName',$firstName);
            $this -> con -> bind(':lastName',$lastName);
            $this -> con -> bind(':d',$d);
            $this -> con -> bind(':falID',$falID);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }
}
?>