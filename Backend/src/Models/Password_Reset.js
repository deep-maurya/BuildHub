const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new Schema({
  userId: {
    type: String,
    ref: "Users",
    required: true,
  },
  identifier: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  signature : {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900, // 900 seconds = 15 minutes
  },
});

schema.pre("save", async function (next) {
    if (this.isModified("signature")) {
        const salt = await bcrypt.genSalt(10);
        this.signature = await bcrypt.hash(this.signature, salt);
    }
    next();
});
// Create the model
const ForgetPassword = model("ForgetPassword", schema);

module.exports =  ForgetPassword;
