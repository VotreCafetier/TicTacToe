<?php
// redirect user to login page if not auth
if($PagePrivacy == 1 and !$user->IsLoggedIn())
    header('Location: Login.php');  // redirect to login page
else if ($PagePrivacy == 0 and $user->IsLoggedIn())
    header('Location: Index.php');  // redirect to main page page