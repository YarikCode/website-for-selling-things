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
}

if(isset($_GET['type_request'])){
    if($_GET['type_request'] == 'loadAds') loadAds($_GET['page']);
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

function loadAds($page){
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things');
    $query = "SELECT COUNT(*) FROM `ads`";
    $result = mysqli_query($connection, $query);
   
    if($result){
        $array = mysqli_fetch_array($result);
    }
    $pages = ceil($array['COUNT(*)']/15);

    $buttons = [];
    $content = [];

    for($i = 1; $i <= $pages; $i++){
        $buttons[] = "<button class='footer_button'>". $i ."</button>";
    }

    $query = "SELECT ads.name, ads.description, users.login, ads.price, ads.file FROM ads INNER JOIN users ON ads.user_id = users.id LIMIT " . ($page - 1)*15 . ", 15;";
    $result = mysqli_query($connection, $query);
    if($result){
        while($row = mysqli_fetch_array($result)){
            $content[] = '
            <div class="ad_div">
                <img class="ad_image" src="./server/images/' . $row['file'] . '">
                <div class="ad_text_div">
                    <a href="#" class="ad_title">'. $row['name'] .'</a>
                    <p class="ad_description">'. $row['description'] .'</p>
                    <p class="ad_author">'. $row['login'] .'</p>
                    <p class="ad_price">'. $row['price'] .'</p>
                </div>
            </div>
            ';
        }
    }

    $response = ['buttons' => $buttons, 'content' => $content];
    echo json_encode($response);
}

?>