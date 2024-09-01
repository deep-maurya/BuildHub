
const validator = require("validator");
const { BatchModel } = require("../../Models/Batch");
const { courseModel } = require("../../Models/Course");
const { EnrollmentModel } = require("../../Models/StudentBatchEnroll");


const input_fileds_validate_batch = (req,res,next) =>{
    const { batchName } = req.body;
    let status = 0;
    let data = [];

    const batchNameRegex = /^[a-zA-Z0-9-\s]+$/;
    if (!batchName || !batchNameRegex.test(batchName)) {
        msg = "Invalid or missing Batch Name. Batch Name should contain only letters, numbers, hyphens, and spaces.";
        return res.json({ status: status, message: msg, data: data });
    }

    req.batchData = { batchName };
    next();
}

const check_duplicate_batch_name = async(req,res,next) =>{
    const {batchName} = req.batchData;
    try {
        const match = await BatchModel.findOne({name:batchName})
        if(match){
            return res.json({status:0,message:"Batch Name is already used"});
        }
        next();
    } catch (error) {
        res.json({status:0,message:error.message});
    }
}

const create_Batch = async(req,res) => {
    const {batchName} = req.batchData;
    const data = new BatchModel({name:batchName})
    try {
        await data.save();
        res.status(201).json({ status: 1, message: 'Batch Created successfully', data: req.courseData });
    } catch (error) {
        res.status(500).json({ status: 0, message: `An error occurred ${error.message}`, data:[]  });
    }
}

const All_batches = async (req, res) => {
    try {
      
      const batches = await BatchModel.find().select("name");
  
      const batchWithCoursesAndStudents = await Promise.all(
        batches.map(async (batch) => {
          
          const courses = await courseModel
            .find({ batchID: batch._id })
            .select("-__v -created_at")
            .populate("instructor", "name");
  
          const enrollments = await EnrollmentModel.find({ batch: batch._id }).populate(
            "student",
            "name email"
          );
  
          const students = enrollments.map((enrollment) => enrollment.student);

          return {
            ...batch.toObject(),
            stats: {
                totalCourses: courses.length,
                totalStudents: students.length,
            },
            courses,
            students,
          };
        })
      );
  
      return res.status(201).json({
        status: 1,
        message: "All Batches successfully fetched",
        data: batchWithCoursesAndStudents,
      });
    } catch (error) {
      console.log("Error fetching batches, courses, and students:", error);
      return res.status(500).json({ status: 0, message: "Server error" });
    }
  };
  

module.exports = {
    input_fileds_validate_batch,
    check_duplicate_batch_name,
    create_Batch,
    All_batches
}