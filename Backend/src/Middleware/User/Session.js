const { BatchModel } = require("../../Models/Batch");
const { courseModel } = require("../../Models/Course");
const { SessionModel } = require("../../Models/Session");
const { EnrollmentModel } = require("../../Models/StudentBatchEnroll");
const { IndianTime } = require("../../Utils/TimeConvert");

const My_All_sessions = async (req, res, next) => {
    const student_id = req.student.student_id;
  
    try {
      const enrollments = await EnrollmentModel.find({ student: student_id, status: 'Active' })
      if (enrollments.length === 0) {
        return res.status(200).json({
          status: 1,
          message: 'No active batches found for the student.',
          sessions: [],
        });
      }

      const batchIds = enrollments.map(enrollment => enrollment.batch);
      const sessions = await SessionModel.find({ batch_id: { $in: batchIds } }).populate({
          path: 'course_id',
          select: 'title instructor',
          populate: {
            path: 'instructor',
            select: 'name',
          }
      })
  
      // Format responses
      const sessionResponses = sessions.map(session => ({
        _id: session._id,
        title: session.title,
        course: session.course_id ? {
          title: session.course_id.title,
          instructor: session.course_id.instructor ? {
            name: session.course_id.instructor.name,
            email: session.course_id.instructor.email,
          } : 'No instructor details available'
        } : 'No course details available',
        startTime: session.startTime,
        endTime: session.endTime,
      }));
  
      res.status(200).json({
        status: 1,
        message: 'Sessions retrieved successfully.',
        sessions: sessionResponses,
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({
        status: 0,
        message: 'Server error',
        error: error.message,
      });
    }
  };

  const My_Today_sessions = async (req, res, next) => {
    const student_id = req.student.student_id;
  
    try {
      const enrollments = await EnrollmentModel.find({ student: student_id, status: 'Active' });
      if (enrollments.length === 0) {
        return res.status(200).json({
          status: 1,
          message: 'No active batches found for the student.',
          sessions: [],
        });
      }
  
      const batchIds = enrollments.map(enrollment => enrollment.batch);
      const sessions = await SessionModel.find({ batch_id: { $in: batchIds } }).populate({
        path: 'course_id',
        select: 'title instructor',
        populate: {
          path: 'instructor',
          select: 'name email',
        },
      });
  
      // Get the current date
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0); // Set to start of the day
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999); // Set to end of the day
  
      // Filter sessions for today
      const todaySessions = sessions.filter(session => {
        const sessionStartTime = new Date(session.startTime);
        return sessionStartTime >= todayStart && sessionStartTime <= todayEnd;
      });
  
      // Format responses
      const sessionResponses = todaySessions.map(session => ({
        _id: session._id,
        title: session.title,
        course: session.course_id ? {
          title: session.course_id.title,
          instructor: session.course_id.instructor ? {
            name: session.course_id.instructor.name,
            email: session.course_id.instructor.email,
          } : 'No instructor details available',
        } : 'No course details available',
        startTime: IndianTime(session.startTime, 'dd-MM-yyyy HH:mm:ss'),
        endTime: IndianTime(session.endTime, 'dd-MM-yyyy HH:mm:ss'),
      }));
  
      res.status(200).json({
        status: 1,
        message: 'Sessions retrieved successfully.',
        sessions: sessionResponses,
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({
        status: 0,
        message: 'Server error',
        error: error.message,
      });
    }
  };
  

  const My_Batch_and_Courses = async (req, res, next) => {
    const student_id = req.student.student_id;
  
    try {
      const enrollments = await EnrollmentModel.find({ student: student_id, status: 'Active' })
        .populate('batch')
        .exec();
  
      if (enrollments.length === 0) {
        return res.status(200).json({
          status: 1,
          message: 'No active batches found for the student.',
          batches: {},
          courses: {},
          sessions: {},
        });
      }
  
      const batchIds = enrollments.map(enrollment => enrollment.batch._id);
  
      const courses = await courseModel.find({ batchID: { $in: batchIds } }).exec();
      const courseIds = courses.map(course => course._id);
    
      const sessions = await SessionModel.find({ course_id: { $in: courseIds } }).exec();
  
      const batchResponses = enrollments.map(enrollment => ({
        batch: enrollment.batch,
        //sessions: sessions.filter(session => session.batch_id.toString() === enrollment.batch._id.toString()),
      }));
  
      const courseResponses = courses.reduce((acc, course) => {
        acc[course._id] = course;
        return acc;
      }, {});
  
      const sessionResponses = sessions.reduce((acc, session) => {
        acc[session._id] = session;
        return acc;
      }, {});
  
      res.status(200).json({
        status: 1,
        message: 'Sessions retrieved successfully.',
        batches: batchResponses,
        courses: courseResponses,
        sessions: sessionResponses,
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({
        status: 0,
        message: 'Server error',
        error: error.message,
      });
    }
  };

module.exports = {My_All_sessions,My_Today_sessions}