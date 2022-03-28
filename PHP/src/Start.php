<?php
$cUser;
$cPwd;
$PagePrivacy = 0;

session_start();  // start the session

require_once('src/DB.class.php');
require_once('src/User.class.php');

$user = new User();  // Create a db connection