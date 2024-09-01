// models/EnrollmentModel.js
const { Schema, model } = require("mongoose");

const EnrollmentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  batch: {
    type: Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Disabled', 'Completed', 'Async'],
    required: true,
    default: 'Active'
}
});

const EnrollmentModel = model("Enrollment", EnrollmentSchema);

module.exports = { EnrollmentModel };
