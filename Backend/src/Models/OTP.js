const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const OTP_Schema = new Schema({
    otpId: {
        type: String,
        unique: true,
    },
    OTP: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    }
});


OTP_Schema.pre("save", async function (next) {
    if (this.isModified("OTP")) {
        const salt = await bcrypt.genSalt(10);
        this.OTP = await bcrypt.hash(this.OTP, salt);
    }
    next();
});

const OTP = model("OTP", OTP_Schema);

module.exports = OTP;
