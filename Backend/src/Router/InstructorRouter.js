const {Router} = require("express");
const { validate_Instructor, create_cookies_instructor, check_login_or_not_instructor } = require("../Middleware/Instructor/login");
const { validate_login, check_roles } = require("../Middleware/common");
const { session_create_precheck, session_create_form_validate, time_availability, create_new_session } = require("../Middleware/Instructor/session");


const dummy_texter_routes = (req,res) =>{
    res.json({messege:"Okay from server"})
}



const InstructorRouter = Router();

InstructorRouter.post('/login',
    validate_login,
    validate_Instructor,
    check_roles(['instructor']),
    create_cookies_instructor
)



/* 
SESSION RELATED ROUTES START FROM HERE
*/
InstructorRouter.post('/session/create',
    check_login_or_not_instructor,
    check_roles(['instructor']),
    session_create_precheck,
    session_create_form_validate,
    time_availability,
    create_new_session
)
/* 
SESSION RELATED ROUTES END HERE
*/



/* 
BATCH RELATED ROUTES START FROM HERE
*/

/* 
BATCH RELATED ROUTES END HERE
*/




/**
 * Instructor RELATED ROUTES START HERE
 */


/**
 * Instructor RELATED ROUTES END HERE
 */




/**
 * STUDENT RELATES ROUTES START FROM HERE
 */


/**
 * STUDENT RELATES ROUTES END HERE
 */


module.exports = {InstructorRouter}