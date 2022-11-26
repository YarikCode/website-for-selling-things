let hrefLoginForm = document.querySelector('.login_href');

let registrationForm = document.getElementById('registration_form');
let loginForm = document.getElementById('login_form');

let darkScreen = document.querySelector('.dark_div'); 
let closeFormBtn = document.querySelector('.close_form_btn');

let openRegisterBtn = document.getElementById('btn_open_register');
let openLoginBtn = document.getElementById('btn_open_login');

hrefLoginForm.addEventListener('click', (event) => {
    event.preventDefault();
    showForm(loginForm);
});

closeFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeForm(event.target.parentElement);
});

openLoginBtn.addEventListener('click', (event) => {
    closeForm(event.target.parentElement);
    showForm(registrationForm);
    console.log("Открыть форму Авторизации");
});

openRegisterBtn.addEventListener('click', (event) => {
    closeForm(event.target.parentElement);
    showForm(loginForm);
    console.log("Открыть форму Регистрации");
});

function showForm(form){   
    darkScreen.style.display = "block";
    form.style.display = "flex";
    form.style.left = (window.outerWidth/2) - (form.offsetWidth/2) + "px";
    form.style.top = (window.outerHeight/2) - (form.offsetHeight/2) + "px";
}

function closeForm(form){
    darkScreen.style.display = "none";
    form.style.display = "none";
}