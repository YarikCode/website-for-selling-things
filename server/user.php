<?php

session_start();

if(isset($_POST['login'])) $login = $_POST['login'];
if(isset($_POST['email'])) $email = $_POST['email'];
if(isset($_POST['password'])) $password = $_POST['password'];

if(isset($_POST['type_request'])){
    if($_POST['type_request'] == 'register') register($login, $email, $password);
    if($_POST['type_request'] == 'login') login($email, $password);
}

function register($login, $email, $password){
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things');
    if($login != null && $email != null && $password != null){
        $password = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO `users` (`id`, `login`, `password`, `email`) VALUES (NULL, '$login', '$password', '$email')";
        $result = mysqli_query($connection, $query);
        if($result){
            $_SESSION['username'] = $login;
            echo $_SESSION['username'];
        }
    }
}

function login($email, $password){
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things');
    if($email != null && $password != null){
        $query = "SELECT login, email, password FROM users WHERE email = '$email'";
        $result = mysqli_query($connection, $query);
        while($row = mysqli_fetch_array($result)){
            if(password_verify($password, $row['password'])){
                $_SESSION['username'] = $row['login'];
                echo $_SESSION['username'];
            }
        }       
    }
}

?>