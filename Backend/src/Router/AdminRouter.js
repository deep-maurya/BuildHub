const {Router} = require("express");
const { validate_login, check_roles } = require("../Middleware/common");
const { validate_Admin, create_cookies, check_login_or_not } = require("../Middleware/Admin/login");
const { input_fileds_validate, check_duplicate_title, check_assigend_instructor, create_course, check_assigend_batch, all_courses } = require("../Middleware/Admin/course");
const { input_fileds_validate_batch, check_duplicate_batch_name, create_Batch, All_batches } = require("../Middleware/Admin/batch");
const { get_all_instructor, Instructor_registration_field_check, check_duplicate_email_and_mobile, register_instructor } = require("../Middleware/Admin/Instructor");
const { batch_enroll_pre_check, batch_enroll, batch_enroll_validation } = require("../Middleware/Admin/Student");

const dummy_texter_routes = (req,res) =>{
    res.json({messege:"Okay from server"})
}



const AdminRouter = Router();

AdminRouter.post('/login',
    validate_login,
    validate_Admin,
    check_roles(['admin']),
    create_cookies
)



/* 
COURSE RELATED ROUTES START FROM HERE
*/
AdminRouter.post('/course/create',
    check_login_or_not,
    input_fileds_validate, //check all input fields with valid data
    check_duplicate_title,
    check_assigend_instructor,
    check_assigend_batch,
    create_course,
    (req,res)=>{
        res.send({messege:req.courseData})
    }
)

AdminRouter.get('/course/',
    check_login_or_not,
    all_courses
)
/* 
COURSE RELATED ROUTES END HERE
*/



/* 
BATCH RELATED ROUTES START FROM HERE
*/
AdminRouter.post('/batch/create',
    input_fileds_validate_batch,
    check_duplicate_batch_name,
    create_Batch,
    (req,res)=>{
        res.send({messege:req.courseData})
    }
)

AdminRouter.get('/batch/',
    check_login_or_not,
    All_batches
)
/* 
BATCH RELATED ROUTES END HERE
*/




/**
 * Instructor RELATED ROUTES START HERE
 */

AdminRouter.get('/instructor/',
    check_login_or_not,
    get_all_instructor
)

AdminRouter.post('/instructor/create',
    check_login_or_not,
    Instructor_registration_field_check,
    check_duplicate_email_and_mobile,
    register_instructor,
    //dummy_texter_routes
)
/**
 * Instructor RELATED ROUTES END HERE
 */




/**
 * STUDENT RELATES ROUTES START FROM HERE
 */
AdminRouter.post('/student/batch_enroll',
    batch_enroll_pre_check,
    batch_enroll_validation,
    batch_enroll,
    //dummy_texter_routes,
)

/**
 * STUDENT RELATES ROUTES END HERE
 */


module.exports = {AdminRouter}