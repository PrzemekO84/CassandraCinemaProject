require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cassandra = require('cassandra-driver');
const uuid = require('uuid');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'cassandracinemadatabase'
});

const JWT_SECRET = process.env.JWT_SECRET|| "SecretKey";



//Register api -------------------------------------------------

app.post("/register", async (req, res) =>{

    const {email, username, password, date} = req.body;

    try{
    
        const checkEmailQuery = 'SELECT * FROM users WHERE email =?';
        const checkEmail = await client.execute(checkEmailQuery, [email], {prepare: true});
        if(checkEmail.rows.length > 0){
            return res.status(400).json({message: "This email is already in use."});
        }

        const checkUsernameQuery = 'SELECT * FROM users WHERE username =?';
        const checkUsername = await client.execute(checkUsernameQuery, [username], {prepare: true});
        if(checkUsername.rows.length > 0){
            return res.status(400).json({message: "Username is already taken."})
        }

        const query = "INSERT INTO users (id, email, username, password, joindate) VALUES (?, ?, ?, ?, ?)";
        const params = [uuid.v4(), email, username, password, date];
    
        client.execute(query, params, { prepare: true});
        return res.status(200).json({message: "Registaration succesfully, please sign in!"});
    }
    catch(err){
        console.error("Error registering user:", err);
        res.status(500).send("Registration failed.");
    }
});

//Register api -------------------------------------------------

//Login api -------------------------------------------------

app.post("/login", async (req, res) =>{

    const {usernameEmail, password} = req.body;
    
    try{
        let emailExists = false;
        let usernameExists = false;
    
        const checkUsernameQuery = 'SELECT * FROM users WHERE username =?';
        const checkUsername = await client.execute(checkUsernameQuery, [usernameEmail], {prepare: true})
        if(checkUsername.rows.length > 0){
            usernameExists = true;
        }
    
        const checkEmailQuery = 'SELECT * FROM users WHERE email =?';
        const checkEmail = await client.execute(checkEmailQuery, [usernameEmail], {prepare: true})
        if(checkEmail.rows.length > 0){
            emailExists = true;
        }
    
        if(!usernameExists && !emailExists){
            return res.status(400).json({message: "Username or email does not exists."});
        }
        else if(usernameExists){
            const checkPasswordQuery = 'SELECT password FROM users WHERE username =?'
            const checkPassword = await client.execute(checkPasswordQuery, [usernameEmail], {prepare: true});
            if(checkPassword.rows[0].password  === password){
                const user = checkUsername.rows[0];
                const username = user.username;
                const token = jwt.sign(
                    { id: user.id, username: user.username, email: user.email },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({message: "Successfully loged in!", token, username})
            }
            else{
                return res.status(400).json({message: "Invalid credentials."})
            }

        }
        else if(emailExists){
            const checkPasswordQuery = 'SELECT password FROM users WHERE email =?'
            const checkPassword = await client.execute(checkPasswordQuery, [usernameEmail], {prepare: true});
            if(checkPassword.rows[0].password === password){
                const user = checkEmail.rows[0];
                const username = user.username;
                const token = jwt.sign(
                    { id: user.id, username: user.username, email: user.email },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({message: "Successfully loged in!", token, username})
            }
            else{
                return res.status(400).json({message: "Invalid credentials."})
            }
        }
    }
    catch(err){
        console.error("Error during login:", err);
        res.status(500).send("Login failed.");
    }
})

//Login api -------------------------------------------------

//Authentication -------------------------------------------------

app.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: "You have access!", user: req.user });
});

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = user;
        next();
    });
}

//Authentication -------------------------------------------------

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});





