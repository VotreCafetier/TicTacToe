<?php
    $title = "Login";
    require_once "Partials/_header.php";
    require "src/privacy.php";
?>

<h1>Login</h1>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
    <input type="text" name="Username" placeholder="Username or Email"><br>
    <input type="password" name="Password" placeholder="Password"><br>
    <a href="Register.php">Create a user</a><br>
    <button type=submit>Login</button>
</form>



<?php
    require_once "Partials/_footer.php";
?>

<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") exit();
    $name = $_POST['Username'];
    $pw = $_POST['Password'];

    $user->Login($name, $pw);  //login the user
?>