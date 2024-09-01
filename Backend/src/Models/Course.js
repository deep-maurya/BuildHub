const { Schema, model, default: mongoose } = require("mongoose");

const CourseModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    batchID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

const courseModel = new model("course",CourseModel);

module.exports = {courseModel}