let loginOrRegisterHref = document.querySelector('.login_and_register_href');
let loginHref = document.querySelector('.login_href');
let registrationHref = document.querySelector('.register_href');
let userName = document.querySelector('.user_name');

let loginForm = document.getElementById('login_form');
let registrationForm = document.getElementById('registration_form');
let darkDiv = document.querySelector('.dark_div');

let submitLogin = document.querySelector('.submit_login');
let submitRegister = document.querySelector('.submit_register');

loginOrRegisterHref.addEventListener('click', (event) => {
    event.preventDefault();
    darkDiv.style.display = "block";
    showForm(loginForm);
});

registrationHref.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.style.display = "none";
    showForm(registrationForm);
});

loginHref.addEventListener('click', (event) => {
    event.preventDefault();
    registrationForm.style.display = "none";
    showForm(loginForm);
});

darkDiv.addEventListener('click', () => {
    darkDiv.style.display = "none";
    loginForm.style.display = "none";
    registrationForm.style.display = "none";
});

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(registrationForm);
    sendRequest(formData, succesAuth);
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(loginForm);
    sendRequest(formData, (sql) => {
        console.log(sql);
    });
});

function showForm(form){
    form.style.display = "block";
    form.style.top = (window.innerHeight/2) - (form.offsetHeight/2) + "px";
    form.style.left = (window.innerWidth/2) - (form.offsetWidth/2) + "px";
}

function succesAuth(user){
    userName.innerText = user;
    darkDiv.style.display = "none";
    loginForm.style.display = "none";
    registrationForm.style.display = "none";
    registrationForm.reset();
    loginForm.reset();
}

function sendRequest(formData, callback){
    let XML = new XMLHttpRequest();
    let answer = null;
    XML.open('POST', '../server/server.php');
    XML.setRequestHeader('Content-Disposition', 'application/x-www-form-urlencoded');
    XML.send(formData);
    XML.addEventListener('load', () => {
        if(XML.status == 200){
            callback(XML.response);
        }
    });
}