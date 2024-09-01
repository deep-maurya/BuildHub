const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Session schema
const SessionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    batch_id: {
        type: Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

SessionSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('startTime') || this.isModified('endTime')) {
        this.startTime = new Date(this.startTime).toISOString();
        this.endTime = new Date(this.endTime).toISOString();
    }
    next();
});

// SessionSchema.methods.toIST = function() {
//     const startTimeIST = new Date(this.startTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//     const endTimeIST = new Date(this.endTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//     return {
//         title: this.title,
//         startTime: startTimeIST,
//         endTime: endTimeIST
//     };
// };


const SessionModel = mongoose.model('Session', SessionSchema);

module.exports = { SessionModel };
