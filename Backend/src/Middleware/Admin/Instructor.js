const { UserModel } = require("../../Models/User")
const validator = require("validator");
const { instructorRegistration } = require("../../Utils/Email_templates");
const { Mail_Sender } = require("../../Utils/EmailSender");

const generate_random_password = (length) =>{
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

const get_all_instructor = async(req,res) => {
    try {
        const instructors = await UserModel.find({role:"instructor"},{password:0,__v:0,});
        res.status(201).json({status:1,message:"All Instructor successfully Fetched",data:[...instructors]})
    } catch (error) {
        console.log(error)
        res.status(500).json({status:0,message:"Server error"})
    }
}


const Instructor_registration_field_check = (req,res,next) =>{
    const { name, email, mobile } = req.body;
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
    const password = generate_random_password(8);
    //console.log(password)
    req.instructorData = { name, email, mobile, password, role:'instructor' };
    next();
}

const check_duplicate_email_and_mobile = async (req, res, next) => {
    const { email, mobile } = req.instructorData;
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

const register_instructor = async(req,res) => {
    const User_data = new UserModel(req.instructorData)
    try {
        await User_data.save();
        const {name,email,password} = req.instructorData;
        const {html,without_html} = instructorRegistration(name,email,password,'k');
        const send_email = await Mail_Sender(email,"Password Reset",without_html,html);
        return res.status(201).json({ status: 1, message: 'Instructor registered successfully', data: User_data });
    } catch (error) {
        return res.status(500).json({ status: 0, message: `An error occurred ${error.message}`, data:[]  });
    }
}


module.exports = {
    get_all_instructor,
    Instructor_registration_field_check,
    check_duplicate_email_and_mobile,
    register_instructor
}