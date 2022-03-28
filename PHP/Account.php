<?php 
$title = 'Account';
require "Partials/_header.php";
echo 'Connected as '.$_SESSION['USERNAME'].'<br/>';
$PagePrivacy = 1;
require "src/privacy.php";
?>

<a href="?Logout">Disconnect</a><br>

<a href="Index.php">Index</a>

<h1>Account</h1>

<!-- Username switch -->
<h4>Change username</h4>
<form action="<?php echo $_SERVER['PHP_SELF']."?ChangeUsername";?>" method="post">
    <input type="text" name="username" placeholder="New Username">
    <button type="submit">Change Username</button>
</form>

<?php
if (isset($_GET['ChangeUsername']))
    $user->ChangeUsername($_POST['username']);
?>

<!-- Email switch -->
<h4>Change username</h4>
<form action="<?php echo $_SERVER['PHP_SELF']."?ChangeEmail";?>" method="post">
    <input type="text" name="email" placeholder="New Email">
    <button type="submit">Change Email</button>
</form>

<?php

?>

<!-- Change password -->
<h4>Change password</h4>
<form action="<?php echo $_SERVER['PHP_SELF']."?ChangePassword";?>" method="post">
    <input type="password" name="OldPwd" placeholder="Old password"><br>
    <input type="password" name="NewPwd" placeholder="new password"><br>
    <input type="password" name="ConfPwd" placeholder="confirm password"><br>
    <button type="submit">Change password</button>
</form>
<span>* Note that this action will <b>disconnect you</b></span>

<?php
if (isset($_GET['ChangePassword']))
    $user->ChangePassword($_POST['OldPwd'], $_POST['NewPwd'], $_POST['ConfPwd']);
?>
<?php require "Partials/_footer.php";?>
