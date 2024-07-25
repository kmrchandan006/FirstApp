const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express() 
app.use(cors()) 
app.use(express.json());

mongoose.connect("mongodb+srv://cwy:test123@cluster0.fpmy766.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0")

app.get('/getUsers', (req, res) => {
    UserModel.find({}).then(function (Users) {
        res.json(Users)
    }).catch(function (err) {
        res.json(err)
    })

})

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
   await newUser.save();
   res.json(user);
})

app.listen(3001, ()=> { 
    console.log("Server is Running") 
})