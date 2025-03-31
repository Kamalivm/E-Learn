const express =require('express');

const user = require('../modals/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const salt = 10;
const router = express.Router();

// const auth = require('./authrouter')


router.post('/signup' , async (req , res) =>{
    // const {username , password , email} = req.body;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if(!username || !password || !email){
        return res.status(422).json({ 
            error : "empty field",
        })
    }

    const exist = await user.findOne({username : username})
    console.log(exist);
    if(exist!=null){
        return res.status(422).json({
            error : "user already exist",
        })
    }

    const hash = await bcrypt.hash(password , salt)

    const newuser = new user({
        username : username ,
        password : hash ,
        email  : email
    })

    const save = await newuser.save();

    if(!save){
        return res.status(422).json({
            error : "user cannot be saved"
        })
    }
    else {
        return res.status(200).json({
            message : "save data into DB",
        })
    }
 
})


router.get('/login' , async(req , res)=>{
    const {username , password } = req.body;
    if(!username || !password ){
        return res.status(422).json({ 
            error : "empty field",
        })
    }

    const exist = await user.findOne({username : username})

    if(exist==null){
        return res.status(422).json({
            error : "user doesnot exists",
        })
    }

    const compare = await bcrypt.compare(password , exist.password);
    if(!compare){
        return res.status(422).json({
            error : "password incorrect !"
        })
    }
    else{
        return res.status(200).json({
            message: "login successul",
        })
    }
    

})





router.get('/' , (req , res) => {
    res.send("user route is working ")

})

module.exports = router;