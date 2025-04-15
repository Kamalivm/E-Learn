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
    gems : {
        type : Number,
        default : 0
    }

    
})

module.exports = moongoose.model('user' , userSchema);