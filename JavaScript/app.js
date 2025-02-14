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
            sessionStorage.setItem("email", data.email);
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

    const movieNameContainer = document.getElementById("movieNameCheck");

    movieNameContainer.textContent = "Selected movie: " + input;

}

function selectHour(input){

    const movieHour = document.getElementById("movieHourCheck");

    movieHour.textContent = "Reservation hour: " + input;
}

async function reserveMovie(){

    const validatedResrvationInformations = reservationValidation();

    if(!validatedResrvationInformations.succes){
        return;
    }
    else{
        const movieName = validatedResrvationInformations.movieName;
        const movieHour = validatedResrvationInformations.movieHour;
        const numberOfTickets = validatedResrvationInformations.numberOfTickets;

    
        reservationInformation(movieName, movieHour, numberOfTickets);

        
        const reserveButton = document.getElementById("reserveButton");

        reserveButton.disabled = true;
        reserveButton.style.backgroundColor = "gray";

    }
    
}

async function getSeatsNumber(){

    const checkValidation = checkMovieValidation();
    if(!checkValidation){
        return;
    }
    else{

        const checkSeatsContainer = document.getElementById("checkSeatsContainer");
        const reservationContainer = document.getElementById("reservationContainer");
    
        const movieNameContainer = document.getElementById("movieNameCheck").textContent.slice(16);
        const movieHourContainer = document.getElementById("movieHourCheck").textContent.slice(18);
    
        const movieName = movieNameContainer.trim();
        const movieHour = movieHourContainer.trim();
        let movieID;
        let availableSeats;

        //TEST DATA//
        const testData = "2025-02-13 " + movieHour
        //TEST DATA//

    
        // const currentDate = new Date();
        // const fullMovieDate = `${currentDate.toISOString().slice(0, 10)} ${movieHour}`;
    
        // console.log("🔹 Formatted fullMovieDate:", fullMovieDate);
    
        await fetch(`http://localhost:3000/getMovie?movieName=${encodeURIComponent(movieName.trim())}`)
            .then(async response => {
                const data = await response.json();
                movieID = data.movieID;
            })
            .catch(error => console.error("Error: " + error)); 
    
        const params = new URLSearchParams();
        params.append("movieID", movieID);
        params.append("movieHour", testData);
    
        await fetch(`http://localhost:3000/getHour?${params.toString()}`)
            .then(async response => {
                if(response.ok){
                    const data = await response.json();
                    return availableSeats = data.availableSeats;
                }
                else{
                    console.error("Error: " + response.statusText);
                }
            })
            .catch(error => console.error("Error:" + error));
    
        checkSeatsContainer.style.display = "none";
        reservationContainer.style.display = "flex"
        
        const movieNumberOfSeats = document.getElementById("movieNumberOfSeats");
        const movieNameReservation = document.getElementById("movieName");
        const movieHourReservation = document.getElementById("movieHour");
        movieNumberOfSeats.textContent = "Number of free seats: " + availableSeats;
        movieNameReservation.textContent = "Selected movie: " + movieName;
        movieHourReservation.textContent = "Selected hour: " + movieHour;

    }    
}

async function reservationInformation(movieName, movieHour, numberOfTickets){

    const username = sessionStorage.username;
    const email = sessionStorage.email;

    const fullMovieDate = "2025-02-13 " + movieHour;


    console.log(movieName);
    console.log(movieHour);
    console.log(numberOfTickets);
    console.log(fullMovieDate);
    console.log(username);
    console.log(email);


    
    await fetch("http://localhost:3000/postReservation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({movieName, movieHour, numberOfTickets, fullMovieDate, username, email})
    })
    .then(async response => {
        const data = await response.json();
        const movieReservationErrorMessage = document.getElementById("movieReservationErrorMessage");
        const reservationMessege = document.getElementById("reservationMessege"); //Dodatkowa wiadomosc aby zobaczyc co zostalo przeslane do bazy dancyh :)
        movieReservationErrorMessage.style.display = "block";

        if(response.ok){
            movieReservationErrorMessage.style.color = "#66ff33"
            movieReservationErrorMessage.textContent = "Successful reservation."
            reservationMessege.textContent = data.message;
        }
        else{
            movieReservationErrorMessage.style.color = "red";
            movieReservationErrorMessage.textContent = "Unsuccessful reservation.";
            reservationMessege.textContent = data.message;
        }
    })
    .catch(error => {
        console.error("Error " + error);
    })
       
}

function reservationValidation(){

    const movieReservationErrorMessage = document.getElementById("movieReservationErrorMessage");
    const movieName = document.getElementById("movieName").textContent.slice(16);
    const movieHour = document.getElementById("movieHour").textContent.slice(15);
    const StringOfTickets = document.getElementById("numberOfTickets").value;
    const movieStringOfSeats = document.getElementById("movieNumberOfSeats").textContent.slice(22);
    const numberOfTickets = Number(StringOfTickets);
    const movieNumberOfSeats = Number(movieStringOfSeats);
    let succes = false;
    
    const tokenSuccess = isToken();

    if(!tokenSuccess){
        movieReservationErrorMessage.style.display = "block"
        movieReservationErrorMessage.textContent = "You need to be logged in to reserve a movie."
    }
    else if(numberOfTickets === 0 || numberOfTickets > 20 || numberOfTickets < 0){
        movieReservationErrorMessage.style.display = "block";
        movieReservationErrorMessage.textContent = "Please select correct number of tickets you want to reserve";
    }
    else if(movieNumberOfSeats === 0){
        movieReservationErrorMessage.style.display = "block";
        movieReservationErrorMessage.textContent = "We are sorry we don't have more available tickets for this seance.";
    }
    else{
        succes = true;
    }

    return {movieName, movieHour, numberOfTickets, succes}
}


function checkMovieValidation(){

    const movieReservationErrorMessage = document.getElementById("movieCheckErrorMessage");

    let succes = false;

    const movieName = document.getElementById("movieNameCheck");
    const movieHour = document.getElementById("movieHourCheck");

    if(movieName.textContent === "Movie: Please select movie"){
        movieReservationErrorMessage.style.display = "block";
        movieReservationErrorMessage.textContent = "You need to choose a movie first.";
        return succes
    }
    else if(movieHour.textContent === "Starting hour: Please select hour"){
        movieReservationErrorMessage.style.display = "block";
        movieReservationErrorMessage.textContent = "You need to choose an hour first.";
        return succes
    }
    else{
        return succes = true;
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







