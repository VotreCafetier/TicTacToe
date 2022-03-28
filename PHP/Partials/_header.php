<?php
    require_once 'src/Start.php';
?>

<?php
    // if there is a logout get
    if (isset($_GET['Logout']))
    {
        $user->LogOut();  //Logout user
        header('Location: Login.php');  // redirect to login page
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
</head>
<body>