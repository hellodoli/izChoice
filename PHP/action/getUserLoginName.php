<?php
    session_start();
    if( isset( $_SESSION["loginname"] ) ) {
        $loginName = $_SESSION["loginname"];
        echo json_encode( $loginName );
    }else {
        echo '';
    }
?>