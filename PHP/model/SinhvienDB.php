<?php
require_once("db.php");

class SinhvienDB extends Connection {

    private $con;

    public function __construct() {
        $this -> con = new Connection();
    }

    public function getStudentByTeacher( $classID, $username ) {
        try{
            $sql = "SELECT sv.MaSV, sv.Ho, sv.Ten, sv.Diachi, sv.Ngaysinh
            FROM Lop l, Giaovien gv, Sinhvien sv
            WHERE l.MaKhoa = gv.MaKhoa and
            sv.MaLop = l.MaLop and
            l.MaLop =:classID and gv.MaGV =:teacherID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID',$classID);
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

    public function getStudentByClassID( $classID ) {
        try{
            $sql = "SELECT sv.MaSV, sv.Ho, sv.Ten, sv.Diachi, sv.Ngaysinh
            FROM Lop l, Sinhvien sv
            WHERE sv.MaLop = l.MaLop and
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

    public function checkExistStudent( $studentID ){
        try{
            $sql = "SELECT * FROM Sinhvien WHERE MaSV =:studentID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':studentID',$studentID);
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

    public function insertStudent( $studentID, $classID, $firstName, $lastName, $birth, $address ) {
        try{
            $sql = "INSERT INTO Sinhvien (MaSV, MaLop, Ho, Ten, Ngaysinh, Diachi) VALUES (:studentID, :classID, :firstName, :lastName, :birth, :addresss)";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':studentID',$studentID);
            $this -> con -> bind(':classID',$classID);
            $this -> con -> bind(':firstName',$firstName);
            $this -> con -> bind(':lastName',$lastName);
            $this -> con -> bind(':birth',$birth);
            $this -> con -> bind(':addresss',$address);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function updateStudent( $firstName, $lastName, $address, $birth, $studentID ) {
        try{
            $sql = "UPDATE Sinhvien 
            SET Ho =:firstName, Ten =:lastName, Diachi =:addresss, Ngaysinh =:birth 
            WHERE MaSV =:studentID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':firstName',$firstName);
            $this -> con -> bind(':lastName',$lastName);
            $this -> con -> bind(':addresss',$address);
            $this -> con -> bind(':birth',$birth);
            $this -> con -> bind(':studentID',$studentID);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function getStudentById( $studentID ) {
        try{
            $sql = "SELECT sv.MaSV, sv.Ho, sv.Ten, sv.Diachi, sv.Ngaysinh
            FROM Sinhvien sv
            WHERE sv.MaSV =:studentID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':studentID',$studentID);
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