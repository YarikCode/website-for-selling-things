// Ссылки и объекты страницы
let loginOrRegisterHref = document.querySelector('.login_and_register_href');
let loginHref = document.querySelector('.login_href');
let registrationHref = document.querySelector('.register_href');
let userName = document.querySelector('.user_name');
let darkDiv = document.querySelector('.dark_div');
let addAdBtn = document.querySelector('.add_btn');
let logoutBtn = document.querySelector('.logout_btn');
let adsContainer = document.querySelector('.ads_container');
let errorsRegister = document.getElementById('error_register');
let errorsLogin = document.getElementById('error_login');

// Формы
let loginForm = document.getElementById('login_form');
let registrationForm = document.getElementById('registration_form');
let addForm = document.getElementById('add_form');

// Загрузка имени пользователя
document.addEventListener('DOMContentLoaded', () => {

    // Загрузить имя пользователя
    loadUser("type_request=loadLogin", (login) => {
        userName.innerText = login;
    });

    // Загрузить объявления
    loadAds("type_request=loadAds", (ads) => {
        let adsArray = JSON.parse(ads);
        adsArray.forEach(element => {
            showAd(element['name'], element['description'], element['author'], element['price'], element['file']);
        });
    })
});

// Обработка выхода
logoutBtn.addEventListener('click', () => {
    logout("type_request=logout");
    userName.innerText = "";
});

// Открыть форму
loginOrRegisterHref.addEventListener('click', (event) => {
    event.preventDefault();
    darkDiv.style.display = "block";
    showForm(loginForm);
});

// Открыть форму авторизации
registrationHref.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.style.display = "none";
    showForm(registrationForm);
});

// Открыть форму авторизации
loginHref.addEventListener('click', (event) => {
    event.preventDefault();
    registrationForm.style.display = "none";
    showForm(loginForm);
});

// Закрыть формы
darkDiv.addEventListener('click', () => {
    darkDiv.style.display = "none";
    loginForm.style.display = "none";
    registrationForm.style.display = "none";
    addForm.style.display = "none";
    document.body.style.position = "relative";
    loginForm.reset();
    registerForm.reset();
    errorsRegister.innerText = "";
    errorsLogin.innerText = "";
});

// Отправка запроса регистрации
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if(registrationForm.password.value == registrationForm.record_password.value){
        let formData = new FormData(registrationForm);
        sendRequest(formData, succesAuth, (error) => {
            errorsRegister.innerText = error;
        });
    }
    else{
        errorsRegister.innerText = 'Пароли не совпадают';
    }
});

// Отправка запроса авторизации
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(loginForm);
    sendRequest(formData, succesAuth, (error) => {
        errorsLogin.innerText = error;
    });
});

// Открыть форму для добавления объявления
addAdBtn.addEventListener('click', (event) => {
    darkDiv.style.display = "block";
    showForm(addForm);
});

// Функцция открывает форму
function showForm(form){
    document.body.style.position = "fixed";
    form.style.display = "block";
    form.style.top = (window.innerHeight/2) - (form.offsetHeight/2) + "px";
    form.style.left = (window.innerWidth/2) - (form.offsetWidth/2) + "px";
}

// Функцция выводит имя пользователя при успешной авторизации
function succesAuth(){
    loadUser("type_request=loadLogin", (login) => {
        userName.innerText = login;
    });
    darkDiv.style.display = "none";
    loginForm.style.display = "none";
    registrationForm.style.display = "none";
    registrationForm.reset();
    loginForm.reset();
}

// Функцция для отправки запроса
function sendRequest(formData, callback, failAuth){
    let XML = new XMLHttpRequest();
    XML.open('POST', '../server/user.php');
    XML.setRequestHeader('Content-Disposition', 'application/x-www-form-urlencoded');
    XML.send(formData);
    XML.addEventListener('load', () => {
        if(XML.status == 200){
            if(XML.response == ""){
                // Успешная авторизация
                callback();
            }
            else{
                // Ошибки
                failAuth(XML.response);
            }
        }
    });
}

// Функция загрузки имени пользователя
function loadUser(data, callback){
    let XML = new XMLHttpRequest();
    XML.open('POST', '../server/user.php');
    XML.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XML.send(data);
    XML.addEventListener('load', () => {
        if(XML.status == 200){
            callback(XML.response);
        }
    });
}

// Функция выхода пользователя
function logout(data){
    let XML = new XMLHttpRequest();
    XML.open('POST', '../server/user.php');
    XML.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XML.send(data);
}

// Функция загрузки объявлений
function loadAds(data, callback){
    let XML = new XMLHttpRequest();
    XML.open('POST', '../server/ads.php');
    XML.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XML.send(data);
    XML.addEventListener('load', () => {
        if(XML.status == 200){
            callback(XML.response);
        }
    });
}

// Функция отрисовки объявлений
function showAd($name, $description, $author, $price, $file){
    let adDiv = document.createElement('div');
    adDiv.classList.add('ad_div');

    let adImage = document.createElement('img');
    adImage.classList.add('ad_image');
    adImage.setAttribute('src', "./server/images/" + $file);
    adDiv.appendChild(adImage);

    let adTextDiv = document.createElement('div');
    adTextDiv.classList.add('ad_text_div');
    adDiv.appendChild(adTextDiv);

    let name = document.createElement('a');
    name.innerText = $name;
    name.setAttribute("href", "/");
    name.classList.add('ad_title');
    adTextDiv.appendChild(name);

    let description = document.createElement('p');
    description.innerText = $description;
    description.classList.add('ad_description');
    adTextDiv.appendChild(description);

    let author = document.createElement('p');
    author.innerText = $author;
    author.classList.add('ad_author');
    adTextDiv.appendChild(author);

    let price = document.createElement('p');
    price.innerText = $price;
    price.classList.add('ad_price');
    adTextDiv.appendChild(price);

    adsContainer.appendChild(adDiv);
}