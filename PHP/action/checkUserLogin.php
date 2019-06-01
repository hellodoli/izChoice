<?php
require('../model/TaikhoanDB.php');
$tk = new TaikhoanDB();

$loginname = $_POST["loginname"];
$password = $_POST["password"];

$_POST = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
$data = [
    'loginname' => trim($loginname),
    'password' => trim($password),
    'username' => '',
    'role' => '',

    'loginname_err' => '',
    'password_err' => '',
    'status' => false
];

if (empty($data['loginname'])) {
    $data['loginname_err'] = 'Loginname không được bỏ trống';
} else if (!$tk->checkUserExist($data['loginname'])) {
    $data['loginname_err'] = 'Loginname không tồn tại';
}

if (empty($data['password'])) {
    $data['password_err'] = 'Password không được bỏ trống';
}

if (empty($data['loginname_err']) && empty($data['password_err'])) {
    $loginUser = $tk->checkLogin($data['loginname'],$data['password']);
    if($loginUser) {
        // login success
        $data['username'] = $loginUser-> Ten;
        $data['role'] = $loginUser-> MaDQ;
        $data['status'] = true;
        $tk->createUserSession($loginUser);
    } else {
        $data['password_err'] = 'Password không chính xác';
    }
}

echo json_encode($data);

?>