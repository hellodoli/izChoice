<?php
require_once("db.php");

class BoDeCTDB {

    private $con;

    public function __construct() {
        $this-> con = new Connection();
    }

    public function getExamDeTailByExamId( $examID ) {
        try{
            $sql = "SELECT bd.Trinhdo, bd.MaBD, mh.MaMH, bdc.Cauhoi, 
            bdc.Noidung, bdc.A, bdc.B, bdc.C, bdc.D, bdc.Dapan
            FROM BodeCT bdc, Bode bd, Monhoc mh 
            where mh.MaMH = bd.MaMH and bdc.MaBD = bd.MaBD and bd.MaBD =:examID";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':examID',$examID);
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

    public function getExamDeTailByExamIdAndUser( $examID, $username ) {
        try{
            $sql = "SELECT bd.Trinhdo, bd.MaBD, mh.MaMH, 
            bdc.Cauhoi, bdc.Noidung, bdc.A, bdc.B, bdc.C, bdc.D, bdc.Dapan 
            FROM BodeCT bdc, Bode bd, Monhoc mh, Giaovien gv 
            WHERE mh.MaMH = bd.MaMH and
            bdc.MaBD = bd.MaBD and
            gv.MaGV = bd.MaGV and
            bd.MaBD =:examID and gv.MaGV =:username";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':examID',$examID);
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
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function updateExamDeTail( $content, $a, $b, $c, $d, $examID, $examDetailID ) {
        try {
            $sql = "UPDATE BodeCT SET Noidung =:content, A =:A, B =:B, C =:C, D =:D WHERE MaBD =:examID and Cauhoi =:question";
            $this -> con -> prepare( $sql );
            $this -> con -> bind(':content',$content);
            $this -> con -> bind(':A',$a);
            $this -> con -> bind(':B',$b);
            $this -> con -> bind(':C',$c);
            $this -> con -> bind(':D',$d);
            $this -> con -> bind(':examID',$examID);
            $this -> con -> bind(':question',$examDetailID);
            return $this-> con -> execute();
        } catch (PDOException $e) {
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function deleteExamDeTail( $examID, $examDetailID ) {
        try{
            $sql = "DELETE FROM BodeCT WHERE MaBD =:examID and Cauhoi =:examDetailID";
            $this -> con -> prepare( $sql );
            $this -> con -> bind(':examID',$examID);
            $this -> con -> bind(':examDetailID',$examDetailID);
            return $this-> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function getExamDeTailRandom( $examIdSql, $number ) {
        try{
            $sql = "SELECT ct.Noidung, ct.A, ct.B, ct.C, ct.D, ct.Dapan FROM BodeCT ct, Bode bd
            WHERE ct.MaBD = bd.MaBD and ($examIdSql) ORDER BY RAND() LIMIT $number";
            $this -> con -> prepare($sql);
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

    public function getExamDeTailByEnrol( $examID, $courseID, $time ) {
        try{
            $sql = "SELECT bd.Trinhdo, bd.MaBD, mh.MaMH, 
            bdc.Cauhoi, bdc.Noidung, bdc.A, bdc.B, bdc.C, bdc.D, bdc.Dapan
            FROM BodeCT bdc, Bode bd, Monhoc mh 
            WHERE mh.MaMH = bd.MaMH and bdc.MaBD = bd.MaBD 
            and bd.MaBD =:examID
            and mh.MaMH =:subjectID
            and bd.Lan =:timee";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':examID',$examID);
            $this -> con -> bind(':subjectID',$courseID);
            $this -> con -> bind(':timee',$time);
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