const { UserModel } = require("../Models/User");
const { OTP_verify } = require("./otp");

const Register = async(req,res) =>{
    const {otp,otp_id} = req.userData;
    const OTP_status = await OTP_verify(otp_id,otp);
    //console.log(OTP_status)
    if(OTP_status.status===1){
        const User_data = new UserModel(req.userData)
        try {
            await User_data.save();
            res.status(201).json({ status: 1, message: 'User registered successfully', data: User_data });
        } catch (error) {
            if (error.code === 11000) { 
                if (error.message.includes('email')) {
                    return res.status(400).json({ status: 0, message: 'Email already exists',data:[] });
                } else if (error.message.includes('mobile')) {
                    return res.status(400).json({ status: 0, message: 'Mobile number already exists',data:[] });
                }
            }
            res.status(500).json({ status: 0, message: `An error occurred ${error.message}`, data:[]  });
        }
    } else {
        res.json({status:0,message:OTP_status.message});
    }  
}


module.exports = {Register}