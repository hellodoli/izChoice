<?php
require_once("db.php");

class MonHocDB {

    private $con; 

    public function __construct() {
        $this -> con = new Connection();
    }

    public function getAllCourse() {
        try {
            $sql = "SELECT MaMH, TenMH FROM Monhoc";
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
        } catch (PDOException $e) {
            $this-> con -> close();
            return $e->getMessage();
        }
    }
    
    // get Course of Username (for Teacher Account)
    public function getCourseByUsername( $username ) {
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, COUNT(gv.MaGV) as count
            FROM Monhoc mh, Giaovien gv, Bode bd
            WHERE mh.MaMH = bd.MaMH and
            gv.MaGV = bd.MaGV and
            gv.MaGV = :username
            group by mh.MaMH, mh.TenMH";
            $this -> con -> prepare( $sql );
            $this -> con -> bind(':username',$username);
            $status = $this -> con -> execute();
            $this -> con -> close();
            if($status) {
                $count = $this -> con -> rowCount();
                if($count > 0){
                    return $this -> con -> resultSet();
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch (PDOException $e){
            $this-> con -> close();
            return $e->getMessage();
        }
    }

    // get All course for Username Basis and School.
    public function getAllCourseForBasis() {
        try{
            $sql = "SELECT mh.MaMH, mh.TenMH, COUNT(gv.MaGV) as count
            FROM Monhoc mh, Giaovien gv, Bode bd
            WHERE mh.MaMH = bd.MaMH and
            gv.MaGV = bd.MaGV
            group by mh.MaMH, mh.TenMH";
            $this -> con -> prepare( $sql );
            $status = $this -> con-> execute();
            $this -> con -> close();
            if($status) {
                $count = $this -> con -> rowCount();
                if($count > 0){
                    return $this -> con -> resultSet();
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    // use for Search (not search live).
    public function getCourseByName( $courseName ) {
        try{
            $sql = "SELECT MaMH, TenMH FROM Monhoc WHERE TenMH LIKE CONCAT('%', ? ,'%')";
            $this -> con -> prepare( $sql );
            $this -> con -> bind(':courseName',$courseName);
            $status = $this -> con -> execute();
            $this -> con -> close();
            if($status) {
                $count = $this -> con -> rowCount();
                if($count > 0){
                    return $this -> con -> resultSet();
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }
}
?>