<?php
require_once('src/constants.php');

class DB{
    protected function Connect(){
        $dbHost = dbHost;
        $dbUser = dbUser;
        $dbPassword = dbPassword;
        $dbName = dbName;
        
        try {
            // connect to db
            $conn = new mysqli($dbHost,$dbUser,$dbPassword,$dbName);
            return $conn;  // return the connection
        }
        catch(mysqli_sql_exception $e){
            die("Connection error : $e");
        }
    }
}