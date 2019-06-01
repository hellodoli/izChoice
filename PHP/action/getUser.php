<?php
    session_start();
    if( isset( $_SESSION["username"] ) && isset( $_SESSION["role"] ) ) {
        $user = [
            'username' => $_SESSION["username"],
            'role' => $_SESSION["role"]
        ];
        echo json_encode($user);
    }else {
        echo json_encode([]);
    }
?>