<?php

class User extends DB{
    private $db_conn;

    public function __construct()
    {
        // create a db connection using parent (DB) function
        $this->db_conn = $this->Connect();
    }

    public function Register($username, $email, $pwd){
        // check if username or password is empty
        if (empty($username || $pwd)) 
            die("Inputs must be all filled");

        // check if username only contains letter and number
        if (!preg_match("/[a-zA-Z0-9]+/", $username))
            die("Name must not contains letters or numbers");
        
        // check if email match as email stuff

            
        $db_user = $this->UserExist($username)[0];
        // echo($db_user[2]." : ".$email);
        // check if user already exists




        /* LEFT HERE */



        if ($db_user[1] === $username)
            die("This username is already taken");

        echo 'it passed username validation';
        // check if email is taken
        if ($db_user[2] === $email)
            die("This email is already taken");

        echo 'it passed email validation';



















        // hash password
        $pwd = password_hash($pwd, PASSWORD_DEFAULT);
        
        // prepare the sql
        $sth = $this->db_conn->prepare('INSERT INTO user (Username, Email, Password) VALUES (?, ?, ?);');
        $sth->bind_param('ss', $username, $email, $pwd);  // bind the attributes

        // check if the code ran successfully
        if ($sth->execute()) {
            echo "New record created successfully";
            header('Location: Login.php');  // redirect to login
        } else {
            echo "Error: " . $this->db_conn->error;
        }
    }

    /*
    $Username = either email or the username
    */
    public function Login($username, $pwd){
        // check if username or password is empty
        if (empty($username || $pwd)) 
            die("Inputs must be all filled");

        // check if user exists
        $userBD = $this->UserExist($username);
        if (empty($userBD))
            die("This username doesnt exist");

        // Check if password is the same as in BD
        $bdpwd = $userBD->fetch_assoc()["Password"];
        if (password_verify($pwd, $bdpwd)){
            session_start(); // start sessions handler
            $userBD->data_seek(0);  // reset pointer
            // Set sessions attributes to user id
            $id = $userBD->fetch_assoc()['USERID'];
            $_SESSION['USERID'] = $id;
            $_SESSION['USERNAME'] = $username;
            header('Location: Index.php');  // redirect to index
        }
        else{
            echo "There was an error";
        }
        
    }

    public function IsLoggedIn(){
        // check if there is a session
        if (isset($_SESSION['USERID'])) return true;

        // by default return false
        return false;
    }

    public function LogOut(){
        // Destroy and unset active session
        session_unset();
        session_destroy();
    }

    public function ChangePassword($old_pwd, $new_pwd, $conf_pwd){
        // check if any inputs are empty
        if (empty($old_pwd || $new_pwd || $conf_pwd)) 
            die("Inputs must be all filled");

        // fetch bd info
        $userBD = $this->UserExist($_SESSION['USERNAME']);
        $bdpwd = $userBD->fetch_assoc()["Password"];
        // check if old password match with db pwd
        if (!password_verify($old_pwd, $bdpwd))
            die ('Wrong password');

        // check if new and conf pwd match
        if($new_pwd !== $conf_pwd)
            die ('New and Confirmation Password doesnt match');

        // hash password
        $conf_pwd = password_hash($conf_pwd, PASSWORD_DEFAULT);

        // prepare the sql
        $sth = $this->db_conn->prepare('UPDATE user SET Password=? WHERE Username=?;');
        $sth->bind_param('ss', $conf_pwd, $_SESSION['USERNAME']);  // bind the attributes

        // check if the code ran successfully
        if($sth->execute()){
            echo "Changed password";
        }
        else{
            echo "Error: " . $this->db_conn->error;
        }

        LogOut(); // log user out
    }

    public function ChangeUsername($new_username){
        // check if any inputs are empty
        if (empty($new_username)) 
            die("Must have a username");

        // check if username only contains letter and number
        if (!preg_match("/[a-zA-Z0-9]+/", $new_username))
            die("Name must not contains letters or numbers");

        // prepare the sql
        $sth = $this->db_conn->prepare('UPDATE user SET Username=? WHERE Username=?;');
        $sth->bind_param('ss', $new_username, $_SESSION['USERNAME']);  // bind the attributes

        // check if the code ran successfully
        if($sth->execute() === TRUE){
            echo "Changed username";
        }
        else{
            echo "Error: " . $this->db_conn->error;
        }

        $_SESSION['USERNAME'] = $new_username;  // update session name
    }

    public function ChangeEmail($newEmail){
    }

    private function UserExist($name){
        // ask if user exists
        $sth = $this->db_conn->prepare('SELECT * FROM `user` WHERE `Username` = ?');
        $sth->bind_param('s', $name);
        $sth->execute();
        $result = $sth->get_result();

        //return the username info if exists
        if ($result->num_rows > 0) return $result->fetch_all();  
    }
}