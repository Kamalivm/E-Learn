const exp = require('express')
const cors = require('cors')
const moong = require('mongoose')
const userRouter = require('./routes/UserRoutes')
const questionRoutes = require('./routes/questionRoutes');

const app = exp();  

app.use(exp.json());  
app.use(cors());

app.use('/user' , userRouter)

app.use('/api/questions', questionRoutes);

const port  = process.env.PORT || 8000 ;
app.listen(port , ()=>{
    console.log("running at server " + port)
})


async function conne(){
    const check= await moong.connect('mongodb://localhost:27017/e-learning');
    if(!check){
        console.log("connection falied")

    }
    else{
        console.log("connected to the DB")
    }
}



conne();







