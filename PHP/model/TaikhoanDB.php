<?php
require_once("db.php");

class TaikhoanDB {

    private $con;

    public function __construct() {
        $this->con = new Connection();
    }

    public function checkUserExist($loginname) {
        try {
            $sql = "SELECT * FROM Nguoidung
            WHERE Tendangnhap =:loginname";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':loginname',$loginname);
            $this -> con -> execute();
            return $this -> con -> resultSingle();
        } catch (PDOException $e) {
            $this -> con -> close();
            return $e -> getMessage();
        }
    }

    public function checkLogin($loginname,$pass) {
        try {
            $sql = "SELECT Tendangnhap, Ten, MaDQ FROM Nguoidung
            WHERE Tendangnhap =:loginname and Matkhau =:pass";
            $this -> con-> prepare($sql);
            $this -> con-> bind(':loginname',$loginname);
            $this -> con-> bind(':pass',$pass);
            $this -> con-> execute();
            return $this -> con -> resultSingle();
        } catch (PDOException $e) {
            $this -> con -> close();
            return $e->getMessage();
        }
    }

    public function createUserSession($user) {
        session_start();
        $_SESSION['loginname'] = $user -> Tendangnhap;
        $_SESSION['username'] = $user -> Ten;
        $_SESSION['role'] = $user -> MaDQ;
    }

    // dùng cho tạo tài khoản 
    public function checkExistUserName( $userName ) {
        try{
            $sql = "SELECT * FROM Nguoidung WHERE Ten =:username";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':username',$userName);
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

    public function checkExistLoginName( $loginName ) {
        try{
            $sql = "SELECT * FROM Nguoidung WHERE Tendangnhap =:loginname";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':loginname',$loginName);
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

    public function createAccount( $loginName, $password, $userName, $role ){
        try{
            $sql = "INSERT INTO Nguoidung(Tendangnhap,Matkhau,Ten,MaDQ) VALUES (:loginname, :passwordd,:username, :rolee)";
            $this -> con -> prepare($sql);
            $this -> con -> bind(':loginname',$loginName);
            $this -> con -> bind(':passwordd',$password);
            $this -> con -> bind(':username',$userName);
            $this -> con -> bind(':rolee',$role);
            return $this -> con -> execute();
        }catch (PDOException $e){
            $this -> con -> close();
            return $e->getMessage();
        }
    }
}
?>