<?php

session_start();

if(isset($_POST['ad_name'])) $ad_name = $_POST['ad_name'];
if(isset($_POST['ad_description'])) $ad_description = $_POST['ad_description'];
if(isset($_POST['ad_price'])) $ad_price = $_POST['ad_price'];
if(isset($_FILES['ad_file'])) $ad_file = $_FILES['ad_file'];

if(isset($_POST['type_request'])){
    if($_POST['type_request'] == 'addAd'){
       if(isset($_SESSION['user'])){
            addAd($ad_name, $ad_description, $ad_price, $ad_file);
       }
       else{
            echo "Для добавления обьявления необходимо авторизоваться";
       }
    }
    if($_POST['type_request'] == 'loadAds') loadAds();
}

function addAd($name, $desc, $price, $file){
    $file_name = md5(microtime() . rand(0, 9999)) . '.' . end(explode('.', $file['name']));
    $user_id = $_SESSION['user']['id'];
    $price = number_format($price, 0, '.', ' ');
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things');
    $query = "INSERT INTO `ads` (`id`, `name`, `description`, `price`, `file`, `user_id`) VALUES (NULL, '$name', '$desc', '$price ₽', '$file_name', '$user_id')";
    $result = mysqli_query($connection, $query);
    if($result){
        copy($file['tmp_name'], './images/' . $file_name);
        Header('Location: ../index.html');
    }
}

function loadAds(){
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things'); 
    $query = "SELECT ads.name, ads.description, users.login, ads.price, ads.file FROM ads INNER JOIN users ON ads.user_id = users.id";
    $result = mysqli_query($connection, $query);
    if($result){
        $ads = array();
        while($row = mysqli_fetch_array($result)){
            array_push($ads, ['name' => $row['name'], 'description' => $row['description'], 'author' => $row['login'], 'price' => $row['price'], 'file' => $row['file']]);
        }
        echo json_encode($ads);
    }
}

?>