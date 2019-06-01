<?php
require_once("db.php");

class GiaoVienDKDB {

    private $con;

    public function __construct() {
        $this -> con = new Connection();
    }
        
    public function getRegisterTime( $classID, $subjectID ) {
        try{
            $sql = "SELECT Lan as lan 
            FROM GiaovienDK
            WHERE MaLop=:classID and MaMH=:subjectID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID',$classID);
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
    
    public function insertResgister( $userName, $classID, $subjectID, $level, $datetime, $turn, $count, $duaration ) {
        try{
            $sql = "INSERT INTO GiaovienDK(MaGV,MaLop,MaMH,Trinhdo,Ngaythi,Lan,Socauthi,Thoigian) 
            VALUES ( :teacherID , :classID , :subjectID , :levell , :datetimee , :turn , :countt , :duration )";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID',$userName);
            $this -> con -> bind(':classID',$classID);
            $this -> con -> bind(':subjectID',$subjectID);
            $this -> con -> bind(':levell',$level);
            $this -> con -> bind(':datetimee',$datetime);
            $this -> con -> bind(':turn',$turn);
            $this -> con -> bind(':countt',$count);
            $this -> con -> bind(':duration',$duaration);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function searchRegister( $username, $subjectID ) {
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, dk.Lan, bd.MaBD, dk.Socauthi, dk.Thoigian
            FROM Bode bd, GiaovienDK dk, Sinhvien sv, Monhoc mh
            WHERE
            sv.MaLop = dk.MaLop and
            bd.MaMH = dk.MaMH and
            mh.MaMH = dk.MaMH and
            dk.Trinhdo = bd.Trinhdo and
            dk.Lan = bd.Lan and
            sv.MaSV =:studentID and dk.MaMH =:subjectID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':studentID', $username);
            $this -> con -> bind(':subjectID', $subjectID);
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

    public function getRegisterByUsername( $username ) {
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, dk.MaLop, dk.Lan, dk.Ngaythi, dk.Socauthi, dk.Thoigian, dk.Trinhdo
            FROM GiaovienDK dk, Giaovien gv, Monhoc mh
            WHERE gv.MaGV = dk.MaGV and
            mh.MaMH = dk.MaMH and
            gv.MaGV =:teacherID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':teacherID', $username);
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

    public function getAllRegister() {
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, dk.MaLop ,dk.Lan, dk.Ngaythi, dk.Socauthi, 
            dk.Thoigian, dk.Trinhdo, gv.Ten
            FROM GiaovienDK dk, Giaovien gv, Monhoc mh
            WHERE gv.MaGV = dk.MaGV and
            mh.MaMH = dk.MaMH";
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

    public function deleteRegister( $classID, $subjectID, $time ) {
        try{
            $sql = "DELETE FROM GiaovienDK WHERE
            MaLop =:classID and MaMH =:subjectID and Lan=:timee";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID', $classID);
            $this -> con -> bind(':subjectID', $subjectID);
            $this -> con -> bind(':timee', $time);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    //For search
    public function searchRegisterByClassID( $classID ){
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, dk.MaLop, dk.Lan, dk.Ngaythi, dk.Socauthi, dk.Thoigian, 
            dk.Trinhdo, gv.Ten
            FROM GiaovienDK dk, Giaovien gv, Monhoc mh
            WHERE gv.MaGV = dk.MaGV and
            mh.MaMH = dk.MaMH and dk.MaLop LIKE CONCAT('%', :classID ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':classID', $classID);
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

    public function searchRegisterBySubjectName( $subjectName ){
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, dk.MaLop, dk.Lan, dk.Ngaythi, dk.Socauthi, 
            dk.Thoigian, dk.Trinhdo, gv.Ten
            FROM GiaovienDK dk, Giaovien gv, Monhoc mh
            WHERE gv.MaGV = dk.MaGV and
            mh.MaMH = dk.MaMH and mh.TenMH LIKE CONCAT('%' , :subjectName ,'%')";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':subjectName', $subjectName );
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

    public function searchRegisterByDate( $date ){
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, dk.MaLop, dk.Lan, dk.Ngaythi, dk.Socauthi,
            dk.Thoigian, dk.Trinhdo, gv.Ten
            FROM GiaovienDK dk, Giaovien gv, Monhoc mh
            WHERE gv.MaGV = dk.MaGV and
            mh.MaMH = dk.MaMH and date(dk.Ngaythi) =:datee";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':datee',$date);
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
            //return $e->getMessage();
            return -1;
        }
    }
}
?>