const express = require("express");
const bodyParser = require("body-parser");
const cassandra = require('cassandra-driver');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'cassandracinemadatabase'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res) =>{

    const {email, username, password, date} = req.body;

    const checkEmailQuery = 'SELECT * FROM users WHERE email =?';
    client.execute(checkEmailQuery, [email], {prepare: true})
        .then(result =>{
            if(result.rows.length > 0){
                res.status(400).json({message: "This email is already in use."});
                return Promise.reject();
            }
            const checkUsernameQuery = 'SELECT * FROM users WHERE username =?';
            return client.execute(checkUsernameQuery, [username], {prepare: true});
        })
        .then(result =>{
            if(result.rows.length > 0){
                res.status(400).json({message: "Username is already taken."})
                return Promise.reject();
            }

            const query = "INSERT INTO users (id, email, username, password, joindate) VALUES (?, ?, ?, ?, ?)";
            const params = [uuid.v4(), email, username, password, date];

            return client.execute(query, params, { prepare: true})
        })
        .then(() =>{
            res.json({message: "Registaration succesfully, please sign in!"});
        })
        .catch(err =>{
            if (err) {
                console.error("Error registering user:", err);
                res.status(500).send("Registration failed.");
            }
            });
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


