<?php

if(isset($_POST['ad_name'])) $ad_name = $_POST['ad_name'];
if(isset($_POST['ad_description'])) $ad_description = $_POST['ad_description'];
if(isset($_POST['ad_price'])) $ad_price = $_POST['ad_price'];
if(isset($_FILES['ad_file'])) $ad_file = $_FILES['ad_file'];

if(isset($_POST['type_request'])){
    if($_POST['type_request'] == 'addAd') addAd($ad_name, $ad_description, $ad_price, $ad_file);
}

print_r($_POST);
echo "<br>";
print_r($_FILES);

function addAd($name, $desc, $price, $file){
    $file_name = $file['name'];
    $connection = mysqli_connect('localhost', 'root', '', 'website-for-selling-things'); 
    $query = "INSERT INTO `ads` (`id`, `name`, `description`, `price`, `file`) VALUES (NULL, '$name', '$desc', '$price', '$file_name')";
    $result = mysqli_query($connection, $query);
    if($result){
        copy($file['tmp_name']);
    }
}

?>