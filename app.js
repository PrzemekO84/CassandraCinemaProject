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
    .then(response => response.json())
    .then(data =>{
        const registerEmail = document.getElementById("registerEmail");
        const registerUsername = document.getElementById("registerUsername");
        const registerPassword = document.getElementById("registerPassword");
        const passwordValidation = document.getElementById("passwordValidation");

        const errorMessage = document.getElementById("errorMessage");

        errorMessage.style.color = "#66ff33";
        errorMessage.style.display = "block";
        errorMessage.textContent = data.message;

        registerEmail.value = ""
        registerUsername.value = ""
        registerPassword.value = ""
        passwordValidation.value =""
    })
    .catch(error => console.error("Error:", error));


    console.log(JSON.stringify(date));

}

function Login(){

    const date = new Date();

    console.log(date);

}


function registerValidation(){

    const email = document.getElementById("registerEmail").value;
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const passwordValidationValue = document.getElementById("passwordValidation").value;

    const registerPassword = document.getElementById("registerPassword");
    const passwordValidation = document.getElementById("passwordValidation");

    if(!email || !username || !password || !passwordValidationValue){
        return showErrorMessages("All fields are required.");
    }
    else if(!email.includes("@")){
        return showErrorMessages("Incorrect email adress.");
    }
    else if(username.length > 20){
        return showErrorMessages("Username cannot be longer than 20 characters.");
    }
    else if(password.length < 6){
        registerPassword.value = "";
        passwordValidation.value = "";
        return showErrorMessages("Your password is too short, minimum length is 6 characters.");
    }
    else if(password.length > 30){
        registerPassword.value = "";
        passwordValidation.value = "";
        return showErrorMessages("Your password is too long, maximum length is 30 characters.");
    }
    else if(password !== passwordValidationValue){
        registerPassword.value = "";
        passwordValidation.value = "";
        return showErrorMessages("Passwords do not match, please try again.");
    }
    else{
        return {email, username, password}
    }
}


function showErrorMessages(message){

    const errorMessage = document.getElementById("errorMessage");

    errorMessage.style.display = "block";

    errorMessage.textContent = message

}



//Registration --------------------------------------