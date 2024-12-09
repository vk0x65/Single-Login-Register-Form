var regSection = document.querySelector("#regSection");
var homeSection = document.querySelector("#homeSection");
var userRegName = document.getElementById('userRegName');
var userRegEmail = document.getElementById('userRegEmail');
var userRegPass= document.getElementById('userRegPass');
var userEmail = document.getElementById('userEmail');
var userPass = document.getElementById('userPass');
var loginBtn = document.getElementById('loginBtn');
var logoutBtn = document.getElementById('logoutBtn');
var signupBtn = document.getElementById('signupBtn');
var username = localStorage.getItem('Username')

document.addEventListener("DOMContentLoaded", function() {
    var storedUsername = localStorage.getItem('Username');
    if (storedUsername) {
        regSection.classList.replace("d-block", "d-none");
        document.getElementById('username').innerHTML = "Welcome " + storedUsername;
        homeSection.classList.replace("d-none", "d-block");
    }
});

var usersList = []
if (localStorage.getItem('users') == null) {
    usersList = []
} else {
    usersList = JSON.parse(localStorage.getItem('users'))
}

function isEmpty() {
    if (userRegName.value == "" || userRegEmail.value == "" || userRegPass.value == "") {
        return false
    } else {
        return true
    }
}

function isEmailExist() {
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email.toLowerCase() == userRegEmail.value.toLowerCase()) {
            return false
        } else {
            console.log(userRegEmail);
        }
    }
}

function register() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var userData = {
        name: userRegName.value,
        email: userRegEmail.value,
        password: userRegPass.value,
    }
    if (usersList.length == 0) {
        usersList.push(userData)
        localStorage.setItem('users', JSON.stringify(usersList))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>'
    } else {
        usersList.push(userData)
        localStorage.setItem('users', JSON.stringify(usersList))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        clearInputs()
    }
}

function clearInputs(){
    userRegName.value = null;
    userRegEmail.value = null;
    userRegPass.value = null;
}

function isLoginEmpty() {
    if (userPass.value == "" || userEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }
    var password = userPass.value;
    var email = userEmail.value;
    var isAuthenticated = false;
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email.toLowerCase() == email.toLowerCase() && usersList[i].password == password) {
            localStorage.setItem('Username', usersList[i].name);
            regSection.classList.replace("d-block", "d-none");
            document.getElementById('username').innerHTML = "Welcome " + usersList[i].name;
            homeSection.classList.replace("d-none", "d-block");
            isAuthenticated = true;
            break;
        }
    }
    if (!isAuthenticated) {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

function logout() {
    localStorage.removeItem('Username')
}

loginBtn.addEventListener('click', login)
signupBtn.addEventListener('click', register)
logoutBtn.addEventListener('click', logout)