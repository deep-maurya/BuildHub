const { create_token, verify_token } = require("../../controller/JWT");
const { UserModel } = require("../../Models/User");
const bcrypt = require("bcrypt");
require("dotenv").config()


const validate_Admin = async (req, res, next) => {
    const { email, password } = req.userLoginData;
    try {
      const user = await UserModel.findOne({ email: email,role:'admin' });
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
      req.role = user.role || '-1'
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


const create_cookies = (req,res) =>{
    const token = create_token({ u_id: req.userLoginData._id });
      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 3600000,
      });
      res.json({ status: 1, message: "User login successfully." });
      //console.log('Session cookie:', req.session.cookie);
}


const check_login_or_not = async(req,res,next) =>{
    const admin_token = req.cookies.admin_token;
    if (!admin_token) {
        return res.status(401).json({ status: 0, message: 'No session token found.' });
    }
    try {
        const decoded = await verify_token(admin_token, process.env.JWT_PRIVATE_KEY);
        if(!decoded.status){
            return res.json({ status: 0, message: 'session is not active', data: [{...decoded}] });
        } 
        next();
    } catch (error) {
        return res.status(401).json({ status: 0, message: 'Invalid or expired token' });
    }
}

module.exports = {
    validate_Admin,
    create_cookies,
    check_login_or_not
}