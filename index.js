const express = require('express')
const mongoose = require('mongoose')
const user = require('./model/userController')
const comment = require("./model/userContact")
const app = express()
const cors = require('cors')


console.log("Jai Shree Ram")

const port = process.env.port || 8080

app.use(express.json())
app.use(cors())





app.post("/contact", async (req, res) => {
    const onecomment = await comment.create(req.body)
    try {
        res.status(200).json({ message: "Comented Successfully", onecomment })
    } catch (error) {
        res.json({ message: error })
    }
})
app.get('/contacts', async (req, res) => {
    const contact_message = await comment.find()
    try {
        res.status(200).json({ message: contact_message })
    } catch (error) {
        res.status(500).json({ message: "No Messages" })
    }
})

app.post("/updatepassword/:id", async (req, res) => {
    const { id } = req.params
    const findupdate = await user.findByIdAndUpdate(id, req.body)
    if (findupdate) {
        try {
            res.status(200).json({ message: "User Updated sucessfully", findupdate })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    else {
        res.send({ message: "User not pound" })
    }
})

app.post('/finduserreset', async (req, res) => {
    const { Email, Mobile_No } = req.body
    const finduser = await user.findOne({ Email: Email })
    const findonemob = await user.findOne({ Mobile_No: Mobile_No })
    if (finduser) {
        if (findonemob) {
            return res.status(200).send({ message: "User  Found Successfully", user: finduser })
        }
        else if (Mobile_No === finduser.Mobile_No) {
            return res.status(200).send({ message: "User Mobile Found Successfully" })
        }
        else {
            return res.status(200).send({ message: "Wrong Mobile Number" })
        }
    }
    else {
        return res.status(200).send({ message: "User Not Registerd" })
    }
})

app.post("/login", async (req, res) => {
    const { Email, Password, Verfied } = req.body
    const findoneuser = await user.findOne({ Email: Email })
    if (findoneuser) {
        if (Password === findoneuser.Password) {
            return res.status(200).send(({ message: "You Are Logined Successfully", User: findoneuser }))
        }
        else {
            return res.send({ message: "Incrrect Password" })
        }
    } else {
        return res.send({ message: "User is Not Registerd" })
    }
})

app.post('/loginwithG', async (req, res) => {
    const { Email, First_Name, Last_Name } = req.body
    const googleuser = await user.findOne({ Email: Email })
    if (googleuser) {
        res.send({ message: "Signing In please wait", User: googleuser })
    }
    else {
        res.send({ message: "SignUp first" })
    }
})

app.post("/update/:id", async (req, res) => {
    const { id } = req.params
    const { Email, First_Name } = req.body
    const updateUser = await user.findByIdAndUpdate(id, req.body)
    if (updateUser) {
        try {
            const newData = await user.findOne({ Email: Email })
            res.status(200).json({ message: "User Updated Successfully", newData })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
    else {
        res.send({ message: "User Not Found" })
    }
})

app.post("/register", async (req, res) => {
    const { Email, Password } = req.body
    const checkdata = await user.findOne({ Email: Email })
    if (checkdata) {
        res.send({ message: "User Is alrady Registered", Data: checkdata })
    }
    else {
        const newdata = await user.create(req.body)
        try {

            res.status(200).json({ message: "User Registerd Sucessfully", newdata })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }


})

app.get('/getalluser', async (req, res) => {
    try {
        const allusers = await user.find()
        res.json(allusers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://abhi:abhi@cluster0.66lmr40.mongodb.net/Project_users?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to Database Sucessfully")
        app.listen(port, () => {
            console.log(`Connection is started on Port ${port}`)
        })
    }).catch((error) => {
        console.log(error)
    })


