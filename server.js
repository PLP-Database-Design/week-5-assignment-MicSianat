// Import some dependencies/ packages 

const express = require('express');
const app = express(); 
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// test connection
db.connect((err) => {
    // If no connection 
    if(err) {
        return console.log("Error connecting to MYSQL");
    }
    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 

// retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = " SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) =>{
        if(err) {
            return res.status(400).send("Error to get patients", err)
        }
        res.status(200).send(data)
    })
})
// retrieve all providers
app.get('/providers', (req, res) => {
    const getPatients = " SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getPatients, (err, data) =>{
        if(err) {
            return res.status(400).send("Error to get providers", err)
        }
        res.status(200).send(data)
    })
})
//Filter patients by First Name
app.get('/get-patients', (req, res) => {
    const getPatients = " SELECT first_name FROM patients"
    db.query(getPatients, (err, data) =>{
        if(err) {
            return res.status(400).send("Error to get patients", err)
        }
        res.status(200).send(data)
    })
})
//Retrieve all providers by their specialty
app.get('/get-providers', (req, res) => {
    const getPatients = " SELECT * FROM providers ORDER BY provider_specialty,  first_name"
    db.query(getPatients, (err, data) =>{
        if(err) {
            return res.status(400).send("Error to get providers", err)
        }
        res.status(200).send(data)
    })
})

// listen to the server
const PORT = 3300
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})