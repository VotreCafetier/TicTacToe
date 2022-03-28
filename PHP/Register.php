<?php
    $title = "Register";
    require "Partials/_header.php";
    require "src/privacy.php";
?>

<h1>Register</h1>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
    <input type="text" name="Username" placeholder="Username"><br>
    <input type="email" name="Email" placeholder="Email"><br>
    <input type="password" name="Password" placeholder="Password"><br>
    <a href="Login.php">Login</a><br>
    <button type=submit>Register</button>
</form>


<?php
    require "Partials/_footer.php";
?>

<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") exit();
    $name = $_POST['Username'];
    $pw = $_POST['Password'];
    $email = $_POST['Email'];
    $user->Register($name, $email, $pw);  // register the user
?>