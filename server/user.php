<?php

session_start();

if(isset($_POST['login'])) $login = $_POST['login'];
if(isset($_POST['email'])) $email = $_POST['email'];
if(isset($_POST['password'])) $password = $_POST['password'];

if(isset($_POST['type_request'])){
    // print_r($_POST);
    if($_POST['type_request'] == 'register') register($login, $email, $password);
    if($_POST['type_request'] == 'login') login($email, $password);
    if($_POST['type_request'] == 'loadLogin') loadsession();
    if($_POST['type_request'] == 'logout') logout();
}

function register($login, $email, $password){
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things');
    if($login != null && $email != null && $password != null){

        $mail_query = "SELECT * FROM `users` WHERE `email` = '$email'";
        $mail_result = mysqli_query($connection, $mail_query);
        if($mail_result){
            print_r($mail_result);
            if($mail_result['num_rows'] == 0){
                $hash_password = password_hash($password, PASSWORD_BCRYPT);
                $query = "INSERT INTO `users` (`id`, `login`, `password`, `email`) VALUES (NULL, '$login', '$hash_password', '$email')";
                $result = mysqli_query($connection, $query);
                if($result){
                    login($email, $password);
                }
            }
            else{
                echo "Пользователь с такой электронной почтой уже существует";
            }
        }
    }
}

function login($email, $password){
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things');
    if($email != null && $password != null){
        $query = "SELECT id, login, email, password FROM users WHERE email = '$email'";
        $result = mysqli_query($connection, $query);
        while($row = mysqli_fetch_array($result)){
            if(password_verify($password, $row['password'])){
                $_SESSION['user'] = ['id' => $row['id'], 'login' => $row['login']];
                echo $_SESSION['user']['login'];
            }
        }       
    }
}

function logout(){
    session_destroy();
}

function loadsession(){
    if(isset($_SESSION['user'])){
        echo $_SESSION['user']['login'];
    }
}

?>