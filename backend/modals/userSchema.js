const moongoose = require('mongoose')

const userSchema = new moongoose.Schema({
    username : {
        type : String
    },
    password : {
        type : String ,
    },
    email : {
        type : String ,
    },
    
})

module.exports = moongoose.model('user' , userSchema);