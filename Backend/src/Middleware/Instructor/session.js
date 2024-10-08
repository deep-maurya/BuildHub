require("dotenv").config();
const mongoose = require('mongoose');
const { SessionModel } = require("../../Models/Session");
const { courseModel } = require("../../Models/Course");
const { BatchModel } = require("../../Models/Batch");
const { convertToISOFormat, IndianTime } = require("../../Utils/TimeConvert");
const validator = require("validator");
const { UserModel } = require("../../Models/User");
const { google } = require('googleapis');
const { EnrollmentModel } = require("../../Models/StudentBatchEnroll");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CALENDER_API_KEY,
  process.env.GOOGLE_CALENDER_SECRET_KEY,
  'http://localhost:9090/user/oauth2callback'
);

const session_create_precheck = (req, res, next) => {
  const { sessionTitle, startDateTime, endDateTime, course_id, batch_id } = req.body;
  const status = 0;
  if (!sessionTitle || !startDateTime || !endDateTime || !course_id || !batch_id) {
    return res.status(201).json({ status,message: 'All fields are required.' });
  }
  // console.log(startDateTime);
  // console.log(endDateTime)
  if (!sessionTitle || !validator.isAlphanumeric(sessionTitle.replace(/\s+/g, ""), "en-US")) {
    msg = "Invalid or missing session title. Title should contain only letters.";
    return res.status(201).json({ message: msg });
  }

  if (!course_id || !validator.isMongoId(course_id)) {
    msg = "Invalid or missing course ID. Please provide a valid ObjectId.";
    return res.status(201).json({ message: msg });
  }

  if (!batch_id || !validator.isMongoId(batch_id)) {
    msg = "Invalid or missing batch ID. Please provide a valid ObjectId.";
    return res.status(201).json({ message: msg });
  }

  const startTime = new Date(convertToISOFormat(startDateTime));
  const endTime = new Date(convertToISOFormat(endDateTime));
  //console.log(startTime)
  if (!startTime || !endTime) {
    return res.status(201).json({ status,message: 'Invalid date format for start or end time.' });
  }
  // uncomment if you want instructor to create only future sessions
  // const now = new Date();
  // if (startTime < now || endTime < now || endTime<startTime) {
  //     return res.status(201).json({ status,message: 'Start or end time cannot be in the past or end cannot be before start.' });
  // }
  req.body.startDateTime = startTime;
  req.body.endDateTime = endTime;
  next();
};

const session_update_precheck = (req, res, next) => {
  const { sessionTitle, startDateTime, endDateTime } = req.body;
  const status = 0;
  if (!sessionTitle || !startDateTime || !endDateTime) {
    return res.status(201).json({ status,message: 'All fields are required.' });
  }
  if (!sessionTitle || !validator.isAlphanumeric(sessionTitle.replace(/\s+/g, ""), "en-US")) {
    msg = "Invalid or missing session title. Title should contain only letters.";
    return res.status(201).json({ message: msg });
  }
  const startTime = new Date(convertToISOFormat(startDateTime));
  const endTime = new Date(convertToISOFormat(endDateTime));
  if (!startTime || !endTime) {
    return res.status(201).json({ status,message: 'Invalid date format for start or end time.' });
  }
  req.body.startDateTime = startTime;
  req.body.endDateTime = endTime;
  next();
};


const session_create_form_validate = async (req, res, next) => {
  const { sessionTitle, course_id, batch_id } = req.body;
  const status = 0;
  try {
    // const existingSession = await SessionModel.findOne({ title: sessionTitle, course_id, batch_id });
    // if (existingSession) {
    //   return res.status(201).json({status, message: 'Session title already exists.' });
    // }
    const instructor_id = req.instructor.instructor_id;//this came from validate login
    const course = await courseModel.findOne({_id:course_id,instructor:instructor_id});
    if (!course) {
      return res.status(201).json({ status,message: 'Invalid course or Instrcutor not assigned for this course' });
    }
    const batch = await BatchModel.findById(batch_id);
    //console.log(batch)
    if (!course || !batch) {
      return res.status(201).json({ status,message: 'Invalid course or batch ID.' });
    }
    next();
  } catch (error) {
    res.status(500).json({status, message: 'Server error.', error: error.message });
  }
};


const time_availability = async (req, res, next) => {
  const { startDateTime, endDateTime, batch_id } = req.body;
  const status = 0;
  try {
    const overlappingSession = await SessionModel.findOne({
      batch_id,
      $or: [
        { startTime: { $lt: endDateTime, $gte: startDateTime } },
        { endTime: { $gt: startDateTime, $lte: endDateTime } },  
        { startTime: { $lte: startDateTime }, endTime: { $gte: endDateTime } }
      ]
    });
    if (overlappingSession) {
      return res.status(409).json({status, message: 'Session time overlaps with another session in the batch.' });
    }
    next();
  } catch (error) {
    res.status(500).json({status, message: 'Server error.', error: error.message });
  }
};


const create_new_session = async (req, res) => {
  const { sessionTitle, startDateTime, endDateTime, course_id, batch_id } = req.body;
  const status = 0;
  try {
    
    const newSession = new SessionModel({
      title: sessionTitle,
      startTime: startDateTime,
      endTime: endDateTime,
      course_id,
      batch_id
    });
    await newSession.save();
    // This code for directly creating session in student google calender if they provide consent
    // const course = await courseModel.findById(course_id).populate('instructor'); 
    // const courseName = course ? course.title : 'Unknown Course';
    // const instructorName = course && course.instructor ? course.instructor.name : 'Unknown Instructor'; 
    // const enrollments = await EnrollmentModel.find({ batch: batch_id }).populate('student');
    // for (const enrollment of enrollments) {
    //   const student = enrollment.student;
    //   if (student.tokens && student.tokens.length > 0) {
    //     const { accessToken, refreshToken } = student.tokens[0];
    //     oauth2Client.setCredentials({
    //       access_token: accessToken,
    //       refresh_token: refreshToken,
    //     });
        
    //     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    //     const event = {
    //       summary: sessionTitle,
    //       start: {
    //         dateTime: new Date(startDateTime).toISOString(),
    //         timeZone: 'Asia/Kolkata',
    //       },
    //       end: {
    //         dateTime: new Date(endDateTime).toISOString(),
    //         timeZone: 'Asia/Kolkata',
    //       },
    //       description: `Session for course: ${courseName} by ${instructorName}`,
    //       reminders: {
    //         useDefault: false,
    //         overrides: [
    //           { method: 'popup', minutes: 10 },
    //           { method: 'popup', minutes: 5 }, 
    //         ],
    //       },
    //     };
    //     try {
    //       await calendar.events.insert({
    //         calendarId: 'primary', // Default calendar
    //         resource: event,
    //       });
    //       console.log(`Event created for student ${student.email}`);
    //     } catch (calendarError) {
    //       console.error(`Failed to create event for ${student.email}: ${calendarError.message}`);
    //     }
    //   }
    // }

    res.status(201).json({status:1, message: 'Session created successfully.', session: newSession });
  } catch (error) {
    res.status(201).json({status, message: 'Failed to create session.', error: error.message });
  }
};


const get_all_Session = async (req, res) => {
  const status = 0;
  try {
      const instructor_id = req.instructor.instructor_id;
      const courses = await courseModel.find({ instructor: instructor_id }).select('_id');
      if (courses.length === 0) {
          return res.status(404).json({status, message: 'No courses found for this instructor.' });
      }
      const courseIds = courses.map(course => course._id);
      const sessions = await SessionModel.find({ course_id: { $in: courseIds } },{__v:0})
          .populate('course_id', 'title')
          .populate('batch_id', 'name')
          .sort({ startTime: 1 });
      const sessionsWithIST = sessions.map(session => {
            return {
              ...session._doc,
              startTime: IndianTime(session.startTime, 'yyyy-MM-dd HH:mm:ss'),
              endTime: IndianTime(session.endTime,'yyyy-MM-dd HH:mm:ss')
            };
      });
      res.status(200).json({status:1,session:sessionsWithIST});
  } catch (error) {
      console.error(error);
      res.status(500).json({status, message: 'An error occurred while fetching sessions.' });
  }
};





const get_session_details = async (req, res, next) => {
  const instructorId = req.instructor.instructor_id;
  const sessionId = req.params.sessionId;
  const status = 0;
  if (!sessionId || !mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({status, message: 'Session ID is required or Invalid Session ID' });
  }

  try {
      // Find the session by ID
      const session = await SessionModel.findById(sessionId).populate('course_id batch_id');
      
      if (!session) {
          return res.status(404).json({status, message: 'Session not found' });
      }
      const course = await courseModel.findById(session.course_id._id);
      if (!course) {
          return res.status(404).json({status, message: 'Course not found' });
      }
      if (!course.instructor.equals(instructorId)) {
          return res.status(403).json({status, message: 'Forbidden: You are not authorized to access this session' });
      }
      res.status(200).json({
          status:1,
          title: session.title,
          startTime: IndianTime(session.startTime, 'yyyy-MM-dd HH:mm:ss'),
          endTime: IndianTime(session.endTime, 'yyyy-MM-dd HH:mm:ss'),
          course: course.title,
          batch: session.batch_id
      });
      
  } catch (error) {
      console.error(error);
      res.status(500).json({status, message: 'Internal Server Error' });
  }
};


const session_update = async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const { sessionTitle, startDateTime, endDateTime } = req.body;
  const status = 0;
  try {
    const updatedSession = await SessionModel.findByIdAndUpdate(
      sessionId,
      {
        title: sessionTitle,
        startTime: startDateTime,
        endTime: endDateTime
      },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ status, message: 'Session not found.' });
    }

    res.status(200).json({ status: 1, message: 'Session updated successfully.', session: updatedSession });
  } catch (error) {
    res.status(500).json({ status, message: 'Failed to update session.', error: error.message });
  }
};


module.exports = {
  session_create_precheck,
  session_create_form_validate,
  time_availability,
  create_new_session,
  get_all_Session,
  get_session_details,
  session_update,
  session_update_precheck
};
