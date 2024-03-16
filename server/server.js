//IMPORT THE LIBRARIES AND DEPENDENCIES HERE
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config()

const app = express()

app.use(express.json())

//SET THE VARIABLE OF THE DB EVIRONMENT
const port = process.env.PORT;
const db_URI =process.env.DATABASE_URL

// user schema

//DEFINE THE SHCEMA HERE

const Schema = mongoose.Schema;

let schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

//CREATE A MONGOOSE MODEL

const User = mongoose.model("User", schema)

module.exports = User;

//CONNECT THE MONGODB USING THE MONGOOSE
mongoose.set("strictQuery", false);
mongoose.connect(db_URI);


//DEFINE A ROOT ROUTE THAT SENDS A HELLO WORLD REPONSE
app.get('/', (req,res) =>{
    res.send("Hello World!");
})


app.post('/api/signup', function (req, res) {
   //CODE HERE

    //Extract the required fields (firstName, lastName, email, password, and confirmPassword) from the request body and store them in separate variables.
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    //Check if all the required fields are present in the request body. If any of the fields is missing, the code returns a failure status and an error message indicating that all input fields are required.
    if(!(firstName && lastName && email && password && confirmPassword)){
        res.send({status:"failure", message: "All fields are required"});
    }

    //Use the bcrypt.hash function to hash the password before storing it in the database. The function takes the password and a salt value (12 in this case) as arguments, and returns the hashed password. If an error occurs while hashing the password, the code returns a failure status and an error message.
    
    //Use the User.create method to create a new user in the database. The method takes the request body as an argument and returns the newly created user. If an error occurs or the user is not created, the code returns a failure status and an error message.

    //If the user is successfully created, the code returns a success status and the newly created user.

    const saltRounds = 12;
    bcrypt.hash(password,saltRounds,(err,hash) =>{
        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        }).then(user => {
            res.status(201);
            res.send({data: {user: user}, status:"success", message: "signed up successfully"});
        }).catch(err => {
            res.send({status:"failure", message: "Something went wrong"});
        })
    });
})

app.post('/api/login', function (req, res) {
    
    //Extract the required fields(email and password) from the request body and store them in separate variables.
    const { email, password } = req.body;

    //If statement to check if both the email and password fields are present in the request body.If any of them is missing, the code returns a failure status and an error message indicating that all input fields are required.
    if(!(email && password)){
        res.status(200);
        res.send({message: "All fields are required!", status: "failure"});
    }
    //Use the User.findOne method to retrieve the user from the database based on the email.If an error occurs or the user is not found, the code returns a failure status and an error message indicating that the email or password is invalid.

    //Use the bcrypt.compare function to compare the password submitted by the user with the hashed password stored in the database.If the passwords do not match, the code returns a failure status and an error message indicating that the email or password is invalid.

    //If the email and password are correct, the code returns a success status and the user.
    User.findOne({email: email}).then(user =>{
        if(!user){
            res.send({message: "Email or password is invalid", status: "failure"});
        }
        else{
            bcrypt.compare(password,user.password, (err,result) =>{
                if(result){
                    res.send({data: {user: user}, status:"success"});
                }
                else{
                    res.send({message: "Email or password is invalid", status: "failure"});
                }
            })
        }
    }).catch(err => {
        console.log(err);
        res.send({message: "Something went wrong", status: "failure"});
    })

})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})






