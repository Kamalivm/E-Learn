const express = require('express')



const router = express.Router();

router.post('/signup' , async (req , res) =>{
    const {username , password , email} = req.body;
    if(!username || !password || !email){
        return res.status(422).json({ 
            error : "empty field",
        })
    }

    const exist = await user.findOne({username : username})
    if(!exist){
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
    if(!exist){
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



