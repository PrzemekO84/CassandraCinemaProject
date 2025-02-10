//Image Slider --------------------------------------

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
            sessionStorage.setItem("token", data.token); //zmienic potem na local
            sessionStorage.setItem("username", data.username);
            showErrorMessages(data.message, "pass");

            hideRegLog("success");
        }
        else{
            showErrorMessages(data.message, "fail");
        }
    })
    .catch(error => console.error("Error: " + error)); 

}

function checkProtectedRoute() {
    fetch("http://localhost:3000/protected", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}` //zamienic potem na localStorage
        }
    })
    .then(async response => {
        const data = await response.json();

        if (response.ok) {
            alert(`Access granted! User: ${data.user.username}`);
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error: " + error));
}

function isToken(){

    const sessionToken = sessionStorage.getItem("token");

    if(!sessionToken){
        return false;
    }
    else{
        return true;
    }
}

//Login --------------------------------------

//Hiding --------------------------------------

function hideRegLog(status){

    const username = sessionStorage.getItem("username");
    const signContainer = document.getElementsByClassName("signINUPContainer");
    const loginRegisterContainer = document.getElementById("loginRegisterContainer");
    const accountIconHref = document.getElementById("iconHref");

    console.log(username);

    if(status === "success"){
        Array.from(signContainer).forEach(element =>{
            element.style.display = "none";
        })

        accountIconHref.href = "";

        const usernameDisplayContainer = document.createElement("div");
        const usernameDisplay = document.createElement("h2");
    
        usernameDisplayContainer.classList.add("usernameDisplayContainer");
        usernameDisplay.textContent = username;
        
        usernameDisplayContainer.append(usernameDisplay);
    
        loginRegisterContainer.append(usernameDisplayContainer);
    }
    else{
        Array.from(signContainer).forEach(element => {
            element.style.display = "block";
        });
    }  

}

window.addEventListener("DOMContentLoaded", () => {
    // const isLoggedIn = sessionStorage.getItem("isLoggedIn");h   
    // const signContainer = document.getElementsByClassName("signINUPContainer");

    // console.log(isLoggedIn);

    const tokenSuccess = isToken();

    if(tokenSuccess){
        hideRegLog("success")
    }
    else{
        hideRegLog("fail")
    }
});

//Hiding --------------------------------------

//Movie Reservation --------------------------------------

function selectMovie(input){

    const movieName = document.getElementById("movieName");

    movieName.textContent = "Selected movie: " + input;

}

function selectHour(input){

    const movieHour = document.getElementById("movieHour");

    movieHour.textContent = "Reservation hour: " + input;
}

function reserveMovie(){

    reservationValidation();
    // else if("tutaj bedzie licza miejsc jeszcze wrzuc to wyzej przed selected movie")
}

function reservationValidation(){

    const movieReservationErrorMessage = document.getElementById("movieReservationErrorMessage");
    const movieName = document.getElementById("movieName");
    const movieHour = document.getElementById("movieHour");
    
    const tokenSuccess = isToken();

    if(!tokenSuccess){

        movieReservationErrorMessage.style.display = "block"
        movieReservationErrorMessage.textContent = "You need to be logged in to reserve a movie."

    }
    else if(movieName.textContent === "Movie: Please select movie"){
        movieReservationErrorMessage.style.display = "block"
        movieReservationErrorMessage.textContent = "You need to choose a movie first."
    }
    else if(movieHour.textContent === "Starting hour: Please select hour"){
        movieReservationErrorMessage.style.display = "block"
        movieReservationErrorMessage.textContent = "You need to choose an hour first."
    }
    else{
        movieReservationErrorMessage.style.display = "block"
        movieReservationErrorMessage.textContent = "Udalo sie xd"
    }
}


//Movie Reservation --------------------------------------


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







