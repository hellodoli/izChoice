<?php
require_once("db.php");

class BangdiemDB {

    private $con;

    public function __construct() {
        $this -> con = new Connection();
    }

    public function insertScore( $username, $subjectID, $examID, $time, $datetime, $score, $content ) {
        try{
            $sql = "INSERT INTO Bangdiem(MaSV, MaMH, MaBD, Lan, Ngaythi, Diem, Baithi) 
            VALUES (:studentID, :subjectID, :examID, :timee, :datetimee, :score, :content)";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':studentID',$username);
            $this -> con -> bind(':subjectID',$subjectID);
            $this -> con -> bind(':examID',$examID);
            $this -> con -> bind(':timee',$time);
            $this -> con -> bind(':datetimee',$datetime);
            $this -> con -> bind(':score',$score);
            $this -> con -> bind(':content',$content);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function checkExistTime( $username, $subjectID ) {
        try{
            $sql = "SELECT count(bdiem.Lan) as count
            FROM Bangdiem bdiem, Sinhvien sv, Monhoc mh
            WHERE bdiem.MaSV = sv.MaSV and
            bdiem.MaMH = mh.MaMH and
            sv.MaSV =:studentID and
            mh.MaMH =:subjectID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':studentID',$username);
            $this -> con -> bind(':subjectID',$subjectID);
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

    public function getSubjectScore() {
        try{
            $sql = "SELECT DISTINCT mh.MaMH, mh.TenMH
            FROM Bangdiem bd, Monhoc mh
            WHERE mh.MaMH = bd.MaMH";
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

    public function getClassScore( $subjectID ) {
        try{
            $sql = "SELECT DISTINCT l.MaLop, l.TenLop
            FROM Bangdiem bd, Lop l, Sinhvien sv
            WHERE bd.MaSV = sv.MaSV and sv.MaLop = l.MaLop and bd.MaMH =:subjectID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':subjectID',$subjectID);
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

    public function getCountScore( $subjectID, $classID ) {
        try{
            $sql = "SELECT DISTINCT bd.Lan
            FROM Bangdiem bd, Lop l, Sinhvien sv
            WHERE bd.MaSV = sv.MaSV and sv.MaLop = l.MaLop and
            bd.MaMH =:subjectID and l.MaLop =:classID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':subjectID',$subjectID);
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

    public function getScoreByBy( $subjectID, $classID, $count ) {
        try{
            $sql = "SELECT bd.MaBD, bd.MaSV, sv.Ho, sv.Ten, bd.Diem, bd.Ngaythi
            FROM Bangdiem bd, Lop l, Sinhvien sv
            WHERE bd.MaSV = sv.MaSV and sv.MaLop = l.MaLop
            and bd.MaMH =:subjectID and l.MaLop =:classID and bd.Lan =:countt";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':subjectID',$subjectID);
            $this -> con -> bind(':classID',$classID);
            $this -> con -> bind(':countt',$count);
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