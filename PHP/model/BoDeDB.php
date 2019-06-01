<?php
require_once("db.php");

class BoDeDB {

    private $con;

    public function __construct() {
        $this-> con = new Connection();
    }

    // get Exam của một giáo viên x trong môn y -- course/:examID
    public function getExamCount( $username, $courseID ) {
        try{
            $sql = "SELECT bd.MaBD, bd.Trinhdo, bd.Lan, mh.MaMH, mh.TenMH 
            FROM Bode bd, Monhoc mh, Giaovien gv 
            WHERE bd.MaGV = gv.MaGV and bd.MaMH = mh.MaMH and gv.MaGV =:username  and mh.MaMH =:courseID
            ORDER BY bd.Trinhdo";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':username',$username);
            $this -> con -> bind(':courseID',$courseID);
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
            $this-> con ->close();
            return $e->getMessage();
        }
    }

    // get Exam của tất cả giáo viên trong môn y -- course/:examID
    public function getAllExamCount( $courseID ) {
        try {
            $sql = "SELECT bd.MaBD, bd.Trinhdo, bd.Lan, mh.MaMH, mh.TenMH, gv.Ten
            FROM Bode bd, Monhoc mh, Giaovien gv 
            WHERE bd.MaGV = gv.MaGV and bd.MaMH = mh.MaMH and mh.MaMH =:courseID
            ORDER BY bd.Trinhdo";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':courseID',$courseID);
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
            $this-> con ->close();
            return $e->getMessage();
        }
    }

    // get đề loại gì (A,B,C) trong môn nào đó, lần thi nào đó -- dùng cho Register
    public function getExamLevel( $courseID, $time ) {
        try{
            $sql = "SELECT bd.Trinhdo FROM Bode bd, Monhoc mh, Giaovien gv WHERE bd.MaGV = gv.MaGV
            and bd.MaMH = mh.MaMH 
            and mh.MaMH =:courseID
            and bd.Lan =:timee group by bd.Trinhdo";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':courseID',$courseID);
            $this -> con -> bind(':timee',$time);
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
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function insertExam( $examID, $courseID, $username, $level, $time ) {
        try{
            $sql = "INSERT INTO Bode(MaBD,MaMH,MaGV,Trinhdo,Lan) VALUES( :examID, :courseID, :username, :levell, :timee )";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':examID',$examID);
            $this -> con -> bind(':courseID',$courseID);
            $this -> con -> bind(':username',$username);
            $this -> con -> bind(':levell',$level);
            $this -> con -> bind(':timee',$time);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e -> getMessage();
        }
    }

    public function insertExamDetail( $examDetailSQL ) {
        try{
            $this -> con -> beginTransaction();
            for ( $i= 0; $i < count($examDetailSQL) ; $i++ ) {
                $this -> con ->exec( $examDetailSQL[$i] );
            }
            $this -> con -> commit();
            $this -> con -> close();
            return true;
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function checkExistExam( $examID ){
        try{
            $sql = "SELECT * FROM Bode WHERE MaBD =:examID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':examID',$examID);
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

    // get Exam by Lan, Trinhdo, Mon hoc --- dùng cho Register Random đề
    public function getExamID( $time, $level, $courseID ) {
        try{
            $sql = "SELECT bd.MaBD
            FROM Bode bd, Monhoc mh
            WHERE bd.MaMH = mh.MaMH and
            bd.Lan =:timee and bd.Trinhdo =:levell and bd.MaMH =:courseID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':timee',$time);
            $this -> con -> bind(':levell',$level);
            $this -> con -> bind(':courseID',$courseID);
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