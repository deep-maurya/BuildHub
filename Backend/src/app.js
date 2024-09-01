const express = require("express")
const cors = require("cors");
const { Dbconnect } = require("./config/DB");
const { UserRouter } = require("./Router/UserRouter");
const cookieParser = require('cookie-parser');
const { AdminRoute, AdminRouter } = require("./Router/AdminRouter");
const { InstructorRouter } = require("./Router/InstructorRouter");
const { verify_token } = require("./controller/JWT");
const { UserModel } = require("./Models/User");

//const { logger } = require("./logs/log");
require("dotenv").config();


const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
//User Routers
app.use('/user',UserRouter)
//Admin Router
app.use('/admin',AdminRouter)
//Instrauctor Router
app.use('/instructor',InstructorRouter)

app.use('/token_verify',async(req,res)=>{
    const token = req.cookies.auth_token;
    if(token){
        const data = await verify_token(token);
        if(data.status){
            const uid = data.decode.u_id
            try {
                const user = await UserModel.findOne({_id:uid},{__v:0,password:0,tokens:0});
                if (!user) {
                    return res.status(401).json({ status: 0, message: 'User not found' });
                  }
                return res.json({ status: 1, user });
            } catch (error) {
                
            }
        }
    }
    res.status(401).json({ status: 0, message: 'Invalid token' });
})

app.get("/",(req,res)=>{
    
    //logger.error('GET request received at /');
    res.json({messege:"from server"})
});

app.listen(PORT,(err)=>{
    if (err) {
        console.log(err);
    } else {
        try {
            Dbconnect(process.env.DB_URL)
            console.log(`server is running at port http://localhost:${PORT}`)
        } catch (error) {
            console.log(error)
        }
    }
})