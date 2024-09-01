const validator = require("validator");
const { OTP_create } = require("../../controller/otp");
const { Mail_Sender } = require("../../Utils/EmailSender");
const bcrypt = require("bcrypt");
const { UserModel } = require("../../Models/User");
const { create_token, verify_token } = require("../../controller/JWT");
const { otpTemplate, resetPassword } = require("../../Utils/Email_templates");
const { create_link_reset_password, verify_link_reset_password } = require("../../controller/ResetPassword");
const ForgetPassword = require("../../Models/Password_Reset");
require("dotenv").config();


//Middleware for REGISTRATION ROUTES
const Registration_precheck = (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  let msg = "All required fields should be present: name, email, mobile, and image.";
  let status = 0;
  let data = [];

  if (!name || !validator.isAlpha(name.replace(/\s+/g, ""), "en-US")) {
    msg = "Invalid or missing name. Name should contain only letters.";
    return res.json({ status, message: msg, data });
  }

  if (!email || !validator.isEmail(email)) {
    msg = "Invalid or missing email. Please provide a valid email address.";
    return res.json({ status, message: msg, data });
  }

  if (!mobile || !validator.isMobilePhone(mobile, "en-IN")) {
    msg = "Invalid or missing mobile number. Please provide a valid mobile number.";
    return res.json({ status, message: msg, data });
  }

  const passwordRegex = /^[A-Za-z0-9\d@$!%*?&]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    msg = "Password must be at least 8 characters long";
    return res.status(201).json({ status, message: msg, data });
  }
  req.userData = { name, email, mobile, password };
  next();
};


const check_duplicate = async (req, res, next) => {
  const { email, mobile } = req.userData;
  try {
    // Check for duplicate email
    const emailExists = await UserModel.findOne({ email: email });
    if (emailExists) {
      return res
        .status(200)
        .json({ status: 0, message: "Email is already registered with us." });
    }
    // Check for duplicate mobile number
    const mobileExists = await UserModel.findOne({ mobile: mobile });
    if (mobileExists) {
      return res
        .status(200)
        .json({ status: 0, message: "Mobile number is already registered with us." });
    }
    next();
  } catch (error) {
    console.error("Error checking for duplicates:", error.message);
    return res
      .status(500)
      .json({
        status: 0,
        message: "An error occurred while checking for duplicates.",
      });
  }
};

const send_otp = async (req, res, next) => {
  try {
    const otp_data = await OTP_create();
    if (otp_data.otp && otp_data.status === 1) {
      const{html,without_html} = otpTemplate(otp_data.otp);
      const send_email = await Mail_Sender(
        req.userData.email,
        "Registration OTP",
        without_html,
        html
      );
      if (send_email.status === 1) {
        // Email sent successfully
        let token = create_token({ ...req.userData, otp_id: otp_data.otp_id });
        res.cookie("reg_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 5 * 60 * 1000,
        });
        return res.status(200).json({ status: 1, message: "OTP sent successfully." });
      } else {
        // Error sending email
        return res.status(500).json({ status: 0, message: "Failed to send OTP email." });
      }
    } else {
      // Error creating OTP
      return res.status(500).json({ status: 0, message: "Failed to create OTP." });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in sending OTP email:", error.message);
    return res.status(500).json({status: 0,message: "An error occurred while sending OTP email."});
  }
};





//Middleware for REGISTRATION OTP VERIFY
const validate_token = async (req, res, next) => {
//   console.log(req.body);
//   console.log("kkk");
  const token = req.cookies.reg_token || "NA";
  const token_verify = await verify_token(token);
  if (token_verify.status) {
    req.userData = token_verify.decode;
    next();
  } else {
    return res.status(400).json({
      status: 0,
      message: `token is expired`,
    });
  }
};

const Registration_precheck_OTP = (req, res, next) => {
  const { otp } = req.body;
  console.log(otp);
  let msg = "OTP is required.";
  let status = 0;
  let data = [];
  const otpRegex = /^\d{6}$/;
  if (!otp) {
    return res.status(400).json({ status, message: msg, data });
  }
  if (!otpRegex.test(otp)) {
    msg = "Invalid OTP format. OTP should be a 6-digit number.";
    return res.status(400).json({ status, message: msg, data });
  }
  req.userData = { ...req.userData, otp: otp };
  //console.log(req.userData)
  next();
};





//Middleware for LOGIN ROUTES


const validate_user = async (req, res, next) => {
  const { email, password } = req.userLoginData;
  try {
    const user = await UserModel.findOne({ email: email,role:'student' });
    if (!user) {
      return res
        .status(400)
        .json({ status: 0, message: "Email is not registered with us or This is not valid email ID for student" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ status: 0, message: "Incorrect password." });
    }

    const token = create_token({ u_id: user._id },'60m');
    res.cookie("auth_token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000,
    });
    // Proceed to the next middleware or send the response
    return res.json({ status: 1, message: "User login successfully.",data:{name:user.name,role:user.role} });
    //console.log('Session cookie:', req.session.cookie);
  } catch (error) {
    return res
      .status(400)
      .json({ status: 0, message: error.message, data: [] });
  }
};

const check_login_or_not_student = async(req,res,next) =>{
  const auth_token = req.cookies.auth_token;
  // console.log(auth_token)
  // console.log(req.body)
  if (!auth_token) {
      return res.status(401).json({ status: 0, message: 'No session token found.' });
  }
  try {
      const decoded = await verify_token(auth_token, process.env.JWT_PRIVATE_KEY);
      if(!decoded.status){
          return res.json({ status: 0, message: 'session is not active', data: [{...decoded}] });
      } 
      req.student = {student_id:decoded.decode.u_id}
      const isMatch =await UserModel.findOne({_id:req.student.student_id,role:'student'});
      if(!isMatch){
        return res.json({ status: 0, message: 'session is not active' });
      }
      req.role = isMatch.role;
      next();
  } catch (error) {
    console.log(error)
      return res.status(401).json({ status: 0, message: "Session Expired" });
  }
}


//Middleware for FORGET PASSWORD REQUEST ROUTES
const forget_password_precheck = (req,res,next) =>{
    const { email } = req.body;
    let msg = "All required fields should be present email";
    let status = 0;
    let data = [];
    if (!email || !validator.isEmail(email)) {
        msg = "Invalid or missing email. Please provide a valid email address.";
        return res.json({ status, message: msg, data });
    }
    req.userData = {email};
    //console.log(req.userData)
    next();
}

const is_email_registered = async(req,res,next) =>{
    const {email} = req.userData
    //console.log(email)
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          return res
            .status(200)
            .json({ status: 0, message: "Email is not registered with us." });
        } 
        req.userData = {...req.userData,name:user.name};
        console.log(req.userData)
        next();
    } catch (error) {
        console.log(error)
        return res
        .status(200)
        .json({ status: 0, message: "Try again"});
    }
}

const send_reset_password_link = async(req,res) => {
    const {name, email} = req.userData;
    const data = await create_link_reset_password(email);
    if(!data.status) {
        return res.status(200).json({ status: 0, message: data.message });
    }
    const {html,without_html} = resetPassword(name,data.reset_link);
    const send_email = await Mail_Sender(email,"Password Reset",without_html,html);
    if (send_email.status === 1) {
        // Email sent successfully
        return res.status(200).json({ status: 1, message: "Reset Password Link sent successfully on your Email." });
    } else {
        // Error sending email
        return res.status(500).json({ status: 0, message: "Failed to send email." });
    }
}






//Middleware for FORGET PASSWORD LINK VERIFY ROUTES
const verify_password_link = async(req,res) => {
    const {token} = req.body;
    if(!token){
        return res.json({status:0,messege:"Token should be passed"})
    }
    const data = await verify_link_reset_password(token);
    //console.log(data)
    if(data.status===1){
        res.cookie("fprl_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        });
        return res.json({status:1,messege:"Reset Link is valid"})
    } else {
        return res.json({status:0,messege:data.message})
    }
}



//MIDDLEWARE FOR RESET PASSWORD ROUTES
const forget_v_link_precheck = async(req,res,next) =>{
    const {password} = req.body;
    const passwordRegex = /^[A-Za-z0-9\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      msg = "Password must be at least 8 characters long";
      return res.status(201).json({ status:0, message: msg });
    }
    const token = req.cookies.fprl_token || "NA";
    const data = await verify_link_reset_password(token);
    //console.log(data)
    if(data.status===1){
        req.userData = {userid:data.uID,password};
        next();
    } else {
        msg = "Invalid Password Reset link, Create new Request";
        return res.status(201).json({ status:0, message: msg });
    }
}

const update_password = async(req,res) => {
    const{userid,password} = req.userData;
    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await UserModel.findOneAndUpdate(
            {email:userid},
            { password: hashpassword },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ status:0,message: "something gone wrong" });
        }
        await ForgetPassword.deleteMany({ userId: userid });
        return res.status(200).json({ status:1,message: "Password updated successfully." });
    } catch (error) {
        // Handle any errors that occur
        console.error("Error updating password:", error);
        res.status(500).json({status:0, message: "An error occurred while updating the password." });
    }
}




module.exports = {
  Registration_precheck,
  send_otp,
  check_duplicate,
  validate_token,
  Registration_precheck_OTP,
  validate_user,
  forget_password_precheck,
  is_email_registered,
  send_reset_password_link,
  verify_password_link,
  forget_v_link_precheck,
  update_password,
  check_login_or_not_student
};
