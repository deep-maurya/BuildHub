const { default: mongoose } = require("mongoose");
const { UserModel } = require("../../Models/User");
const { BatchModel } = require("../../Models/Batch");
const { EnrollmentModel } = require("../../Models/StudentBatchEnroll");

const batch_enroll_pre_check = (req, res, next) => {
    const { batchID, students } = req.body;
    let status = 0;
    let data = [];

    if (!batchID || !mongoose.Types.ObjectId.isValid(batchID)) {
        const msg = "Invalid or missing Batch ID. Please provide a valid BATCH ID.";
        return res.json({ status, message: msg, data });
    }

    if (!Array.isArray(students) || students.length === 0) {
        const msg = "Missing or empty students array. Please provide student email addresses.";
        return res.json({ status, message: msg, data });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = students.filter(email => !emailPattern.test(email));
    if (invalidEmails.length > 0) {
        const msg = `Invalid email addresses found: ${invalidEmails.join(", ")}.`;
        return res.json({ status, message: msg, data });
    }

    req.enrollData = { batchID, students };
    next();
};

const batch_enroll_validation = async(req, res, next) => {
    const {batchID, students } = req.enrollData; 
    let status = 0;
    let data = [];
    try {
        const batchExists = await BatchModel.findById({_id:batchID});
        if (!batchExists) {
            return res.status(404).json({
                status:0,
                message: 'Batch not found. Please provide a valid Batch ID.',
            });
        }

        const users = await UserModel.find({ email: { $in: students } });
        const foundEmails = users.map(user => user.email);
        const missingEmails = students.filter(email => !foundEmails.includes(email));
        if (missingEmails.length > 0) {
            const msg = `The following emails do not belong to any registered user: ${missingEmails.join(", ")}.`;
            return res.json({ status, message: msg, data });
        }

        const nonStudentUsers = users.filter(user => user.role !== 'student');
        if (nonStudentUsers.length > 0) {
            const invalidEmails = nonStudentUsers.map(user => user.email);
            const msg = `The following users do not have the role of 'student': ${invalidEmails.join(", ")}.`;
            return res.json({ status, message: msg, data });
        }

        req.validatedStudents = users;  
        next();

    } catch (error) {
        console.error(error);
        const msg = "An error occurred while checking student roles.";
        return res.status(500).json({ status, message: msg, data });
    }
};

const batch_enroll = async (req, res) => {
    const { batchID } = req.enrollData;
    const { validatedStudents } = req;
    try {
        const enrollments = validatedStudents.map(student => ({
            student: student._id,
            batch: new mongoose.Types.ObjectId(batchID),
        }));

        await EnrollmentModel.insertMany(enrollments);
        res.status(201).json({
            status: 1,
            message: 'Students enrolled successfully in the batch.',
            enrolledStudents: validatedStudents.map(student => student.email),
        });
    } catch (error) {
        console.error('Error enrolling students:', error);
        res.status(500).json({
            status: 0,
            message: 'Failed to enroll students in the batch. Please try again later.',
            error: error.message,
        });
    }
};


module.exports = {
    batch_enroll_pre_check,
    batch_enroll_validation,
    batch_enroll,
}