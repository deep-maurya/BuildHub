const { Router } = require("express");
const { Register } = require("../controller/UserController");
const u_mid = require("../Middleware/User/userMiddleware")
const c_mid = require("../Middleware/common")
const { verify_token } = require("../controller/JWT");
const { Personal_Details } = require("../Middleware/User/User");
const { My_All_sessions } = require("../Middleware/User/Session");
require("dotenv").config()
const { google } = require('googleapis');
const { google_Auth, google_Auth_callback } = require("../Middleware/User/GoogleAuth");
const { UserModel } = require("../Models/User");
const OAuth2 = google.auth.OAuth2;

const UserRouter = Router();


/**
 * Register Related Routes
 */
UserRouter.post('/register',
    u_mid.Registration_precheck,
    u_mid.check_duplicate,
    u_mid.send_otp
);

UserRouter.post('/register_otp_verify',
    u_mid.validate_token,
    u_mid.Registration_precheck_OTP,
    Register
)



/**
 * Reset Password Related Routes
 */
UserRouter.post('/forget_password_request',
    u_mid.forget_password_precheck,
    u_mid.is_email_registered,
    u_mid.send_reset_password_link
)

UserRouter.post('/forget_password_verify',
    u_mid.verify_password_link
)

UserRouter.post('/forget_password',
    u_mid.forget_v_link_precheck,
    u_mid.update_password
)


/**
 * Login Related Routes
 */

UserRouter.post('/login',
    c_mid.validate_login,
    u_mid.validate_user
)


/**
 * Profile Related Routes Here
 */
UserRouter.get('/',
    u_mid.check_login_or_not_student,
    c_mid.check_roles(['student']),
    Personal_Details
);


/**
 * Session Related Routes Here
 */

UserRouter.get('/sessions',
    u_mid.check_login_or_not_student,
    c_mid.check_roles(['student']),
    My_All_sessions

)



UserRouter.get('/check-session', async(req, res) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ status: 0, message: 'No session token found.' });
    }
    try {
        const decoded =await verify_token(token, process.env.JWT_PRIVATE_KEY);
        res.json({ status: 1, message: 'Session is active', data: [{...decoded}] });
    } catch (error) {
        res.status(401).json({ status: 0, message: 'Invalid or expired token' });
    }
});




// Redirect to Google OAuth 2.0 authorization page
UserRouter.get('/auth', 
    u_mid.check_login_or_not_student,
    c_mid.check_roles(['student']),
    google_Auth,
);

// Handle the OAuth 2.0 callback from Google
UserRouter.get('/oauth2callback',
    u_mid.check_login_or_not_student,
    google_Auth_callback
);

// Fetch calendar events
UserRouter.get('/calendar', async (req, res) => {
    const userId = 'some-user-id'; // Replace with actual logic to get user ID

    // Retrieve stored tokens from the database
    const user = await UserModel.findById(userId);
    if (!user || !user.googleTokens) {
        return res.redirect('/auth'); // Redirect to authenticate if tokens are not available
    }

    oauth2Client.setCredentials(user.googleTokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    try {
        const response = await calendar.events.list({ calendarId: 'primary' });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).send('Error fetching calendar events.');
    }
});


UserRouter.get('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.post('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.patch('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.put('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})

UserRouter.delete('*',(req,res)=>{
    res.json({status:0,messege:"Invalid Endpoints"})
})


module.exports = {UserRouter}