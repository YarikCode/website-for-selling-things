// Ссылки и объекты страницы
let loginOrRegisterHref = document.querySelector('.login_and_register_href');
let loginHref = document.querySelector('.login_href');
let registrationHref = document.querySelector('.register_href');
let userName = document.querySelector('.user_name');
let darkDiv = document.querySelector('.dark_div');
let addAdBtn = document.querySelector('.add_btn');

// Формы
let loginForm = document.getElementById('login_form');
let registrationForm = document.getElementById('registration_form');
let addForm = document.getElementById('add_form');

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
});

// Отправка запроса регистрации
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(registrationForm);
    sendRequest(formData, succesAuth);
});

// Отправка запроса авторизации
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(loginForm);
    sendRequest(formData, succesAuth);
});

// Открыть форму для добавления объявления
addAdBtn.addEventListener('click', (event) => {
    darkDiv.style.display = "block";
    showForm(addForm);
});

// Функцция открывает форму
function showForm(form){
    form.style.display = "block";
    form.style.top = (window.innerHeight/2) - (form.offsetHeight/2) + "px";
    form.style.left = (window.innerWidth/2) - (form.offsetWidth/2) + "px";
}

// Функцция выводит имя пользователя при успешной авторизации
function succesAuth(user){
    userName.innerText = user;
    darkDiv.style.display = "none";
    loginForm.style.display = "none";
    registrationForm.style.display = "none";
    registrationForm.reset();
    loginForm.reset();
}

// Функцция для отправки запроса
function sendRequest(formData, callback){
    let XML = new XMLHttpRequest();
    let answer = null;
    XML.open('POST', '../server/user.php');
    XML.setRequestHeader('Content-Disposition', 'application/x-www-form-urlencoded');
    XML.send(formData);
    XML.addEventListener('load', () => {
        if(XML.status == 200){
            callback(XML.response);
        }
    });
}