const { default: mongoose } = require("mongoose");
const { create_token } = require("../../controller/JWT");
const { UserModel } = require("../../Models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { courseModel } = require("../../Models/Course");
const { BatchModel } = require("../../Models/Batch");


/* 
THIS MIDDLEWARE WILL CHECK WHEN ADMIN IS GOING TO CREATE A 
COURSE SO ALL INPUT FILELDS SHOULD BE SEND BY USER WITH PROPER DATA
*/
const input_fileds_validate = (req,res,next) =>{
    const { title, description, instructor, batchID } = req.body;
    let msg = "All required fields should be present: name, email, mobile, and image.";
    let status = 0;
    let data = [];

    if (!title || !validator.isAlpha(title.replace(/\s+/g, ""), "en-US")) {
        msg = "Invalid or missing titlt. title should contain only letters.";
        return res.json({ status, message: msg, data });
    }

    if (!description || !validator.isAlpha(description.replace(/\s+/g, ""), "en-US")) {
        msg = "Invalid or missing description. description should contain only letters.";
        return res.json({ status, message: msg, data });
    }

    if (!instructor || !mongoose.Types.ObjectId.isValid(instructor)) {
        msg = "Invalid or missing instructor ID.";
        return res.json({ status, message: msg, data });
    }

    if (!batchID || !mongoose.Types.ObjectId.isValid(batchID)) {
        msg = "Invalid or missing Batch ID.";
        return res.json({ status, message: msg, data });
    }
    req.courseData = { title, description, instructor, batchID };
    next();
}

const check_duplicate_title = async(req,res,next) =>{
    const {title} = req.courseData;
    try {
        const match = await courseModel.findOne({title})
        if(match){
            return res.json({status:0,message:"Course title is already used"});
        }
        next();
    } catch (error) {
        res.json({status:0,message:error.message});
    }
}

const check_assigend_instructor = async(req,res,next) =>{
    const {instructor} = req.courseData;
    //console.log(instructor)
    try {
        const match = await UserModel.findOne({_id:instructor,role:'instructor'})
        if(!match){
            return res.json({status:0,message:"Provided instructor id is not valid"});
        }
        next();
    } catch (error) {
        res.json({status:0,message:error.message});
    }
}

const check_assigend_batch = async(req,res,next) =>{
    const {batchID} = req.courseData;
    //console.log(instructor)
    try {
        const match = await BatchModel.findOne({_id:batchID})
        if(!match){
            return res.json({status:0,message:"Provided Batch ID is not valid"});
        }
        next();
    } catch (error) {
        res.json({status:0,message:error.message});
    }
}

const create_course = async(req,res) => {
    const data = new courseModel(req.courseData)
    try {
        await data.save();
        res.status(201).json({ status: 1, message: 'Course Created successfully', data: req.courseData });
    } catch (error) {
        res.status(500).json({ status: 0, message: `An error occurred ${error.message}`, data:[]  });
    }
}


const all_courses = async(req,res) => {
    try {
        const courses = await courseModel.find({},{ __v: 0,_id:0 })
                        .populate('instructor', 'name email')
                        .populate('batchID','name');;
        res.status(201).json({status:1,message:"All Courses successfully Fetched",data:[...courses]})
    } catch (error) {
        console.log(error)
        res.status(500).json({status:0,message:"Server error"})
    }
}

module.exports = {
    input_fileds_validate,
    check_duplicate_title,
    check_assigend_instructor,
    check_assigend_batch,
    all_courses,
    create_course
}