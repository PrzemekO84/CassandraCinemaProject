//Image Slider --------------------------------------

const { response } = require("express");

const slider = document.querySelector('.slider');
const links = document.querySelectorAll('.sliderNav a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
});

//Image Slider --------------------------------------



//Registration --------------------------------------

function Registration(){

    const date = new Date().toISOString().split('T')[0];

    const validatedCreditentials = registerValidation();

    const email = validatedCreditentials.email;
    const username = validatedCreditentials.username;
    const password = validatedCreditentials.password;


    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, username, password, date}),
    })
    .then(async response => {
        const data = await response.json();

        if(response.ok){
            showErrorMessages(data.message, "passRegister");
        }
        else{
            showErrorMessages(data.message, "fail");
        }
    })
    .catch(error => console.error("Error: ", error));

}

function registerValidation(){


    const email = document.getElementById("registerEmail").value;
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const passwordValidationValue = document.getElementById("passwordValidation").value;

    const registerPassword = document.getElementById("registerPassword");
    const passwordValidation = document.getElementById("passwordValidation");

    if(!email || !username || !password || !passwordValidationValue){
        return showErrorMessages("All fields are required.", "fail");
    }
    else if(!email.includes("@")){
        return showErrorMessages("Incorrect email adress.", "fail");
    }
    else if(username.length > 20){
        return showErrorMessages("Username cannot be longer than 20 characters.", "fail");
    }
    else if(password.length < 6){
        registerPassword.value = "";
        passwordValidation.value = "";
        return showErrorMessages("Your password is too short, minimum length is 6 characters.", "fail");
    }
    else if(password.length > 30){
        registerPassword.value = "";
        passwordValidation.value = "";
        return showErrorMessages("Your password is too long, maximum length is 30 characters.", "fail");
    }
    else if(password !== passwordValidationValue){
        registerPassword.value = "";
        passwordValidation.value = "";
        return showErrorMessages("Passwords do not match, please try again.", "fail");
    }
    else{
        return {email, username, password}
    }
}

//Registration --------------------------------------

//Login --------------------------------------

function Login(){

    const usernameEmail = document.getElementById("loginEmailUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({usernameEmail, password}),
    })
    .then(async response => {
        const data = await response.json();

        if(response.ok){
            showErrorMessages(data.message, "pass");
        }
        else{
            showErrorMessages(data.message, "fail");
        }
    })
    .catch(error => console.error("Error: " + error)); 

    checkIfLogged();

}

function checkIfLogged(){

    fetch("http://localhost:3000/profile", {
        method: "GET",
        credentials: "include",
    })
    .then(async response =>{
        const data = await response.json();

        if(response.ok){
            console.log(response.text());
        }
        else{
            console.log("BAD ABD BAD!");
        }
    })
    .catch(error => console.error("Error: " + error));

}


function showErrorMessages(message, status){

    const errorMessage = document.getElementById("errorMessage");

    const registerEmail = document.getElementById("registerEmail");
    const registerUsername = document.getElementById("registerUsername");
    const registerPassword = document.getElementById("registerPassword");
    const passwordValidation = document.getElementById("passwordValidation");

    errorMessage.style.display = "block";

    if(status === "fail"){
        errorMessage.style.color = "red";
    }
    else if(status === "passRegister"){
        errorMessage.style.color = "#66ff33";
        registerEmail.value = ""
        registerUsername.value = ""
        registerPassword.value = ""
        passwordValidation.value = ""
    }
    else{
        errorMessage.style.color = "#66ff33";
    }

    errorMessage.textContent = message

}



