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
let footerBtns = document.querySelector('.footer_buttons');

// Формы
let loginForm = document.getElementById('login_form');
let registrationForm = document.getElementById('registration_form');
let addForm = document.getElementById('add_form');

// Переключение страниц
document.addEventListener('click', (event) => {
    if(event.target.classList.contains('footer_button')){
        console.log('Переключение' + event.target.innerText);
        loadAds(event.target.innerText);
    }
});

// Загрузка имени пользователя
document.addEventListener('DOMContentLoaded', () => {

    // Загрузить имя пользователя
    loadUser("type_request=loadLogin", (login) => {
        if(login == ""){
            addAdBtn.style.display = "none";
            logoutBtn.style.display = "none";
        }
        else{
            userName.innerText = login;
        }
    });

    // Загрузить объявления
    loadAds(1);
    
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
    addAdBtn.style.display = "flex";
    logoutBtn.style.display = "block";
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
            console.log(XML.response);
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
    addAdBtn.style.display = "none";
    logoutBtn.style.display = "none";
}

// Функция загрузки объявлений
function loadAds(page){
    let XML = new XMLHttpRequest();
    XML.open('GET', './server/ads.php?type_request=loadAds&page=' + page);
    XML.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XML.responseType = 'json';
    XML.send();
    XML.addEventListener('load', () => {
        if(XML.status == 200){
            console.log(XML.response);
            footerBtns.innerHTML = "";
            adsContainer.innerHTML = "";
            for(let i = 0; i < XML.response.content.length; i++){
                adsContainer.innerHTML += XML.response.content[i];
            }
            for(let i = 0; i < XML.response.buttons.length; i++){
                footerBtns.innerHTML += XML.response.buttons[i];
            }
        }
    });
}