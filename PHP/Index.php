<?php 
$title = 'Index';
require "Partials/_header.php";
echo 'Connected as '.$_SESSION['USERNAME'].'<br/>';
$PagePrivacy = 1;
require "src/privacy.php";
?>

<a href="?Logout">Disconnect</a><br>

<a href="Account.php">Account</a>

<h1>Index</h1>

<?php require "Partials/_footer.php";?>