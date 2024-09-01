const { create_token, verify_token } = require("../../controller/JWT");
const { UserModel } = require("../../Models/User");
const bcrypt = require("bcrypt");
require("dotenv").config()


const validate_Instructor = async (req, res, next) => {
    const { email, password } = req.userLoginData;
    try {
      const user = await UserModel.findOne({ email: email,role:'instructor' });
      if (!user) {
        return res
          .status(201)
          .json({ status: 0, message: "Email is not registered with us." });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .json({ status: 0, message: "Incorrect password." });
      }
      req.role = user.role || '-1';
      req.userLoginData = {
        ...req.userLoginData,
        role: user.role || '-1',
        _id:user._id
      };
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ status: 0, message: error.message, data: [] });
    }
};


const create_cookies_instructor = (req,res) =>{
    const token = create_token({ u_id: req.userLoginData._id },'60m');
      res.cookie("instructor_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 3600000,
      });
      res.json({ status: 1, message: "Instructor login successfully." });
      //console.log('Session cookie:', req.session.cookie);
}


const check_login_or_not_instructor = async(req,res,next) =>{
    const instructor_token = req.cookies.instructor_token;
    if (!instructor_token) {
        return res.status(401).json({ status: 0, message: 'No session token found.' });
    }
    try {
        const decoded = await verify_token(instructor_token, process.env.JWT_PRIVATE_KEY);
        if(!decoded.status){
            return res.json({ status: 0, message: 'session is not active', data: [{...decoded}] });
        } 
        //console.log(decoded)
        req.instructor = {instructor_id:decoded.decode.u_id}
        //console.log(req.instructor)
        const isMatch =await UserModel.findOne({_id:req.instructor.instructor_id,role:'instructor'});
        if(!isMatch){
          return res.json({ status: 0, message: 'session is not active' });
        }
        req.role = isMatch.role
        next();
        //return res.status(401).json({ status: 1, message: {...decoded} });
    } catch (error) {
        return res.status(401).json({ status: 0, message: 'Invalid or expired token' });
    }
}

module.exports = {
    validate_Instructor,
    create_cookies_instructor,
    check_login_or_not_instructor
}