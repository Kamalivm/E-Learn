import user from "../modals/userSchema";
import express from 'express';

const router = express.Router();

router.post('/create' , async(req , res) => {
    const newuser = new user({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
    })

    try{
        const status = await newuser.save();
        res.status(200).json({
            message : "user created successfully"
        })
    }
    catch(err){
        res.status(500).json({
            message : "user cannot be created",
            error : err
        })
    }
})

router.get('/getusers/:id' , async(req , res)=>{
    try{
        const users = await user.findById(req.body.username);

        res.status(200).json({
            message : "user found",
            data : users
        })

    }
    catch(err){
        res.status(500).json({
            message : "user not found",
            error : err
        })
    }
})