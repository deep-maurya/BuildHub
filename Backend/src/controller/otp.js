const OTP = require("../Models/OTP");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const OTP_create = async () => {
    const otp = crypto.randomInt(100000, 1000000);
    const newOtp = new OTP({
        otpId: uuidv4(),
        OTP: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });
    console.log(newOtp);
    try {
        const data = await newOtp.save();
        console.log(data);
        return { status: 1, otp: otp, otp_id: newOtp.otpId };
    } catch (error) {
        console.log(error);
        return { status: 0, message: error.message }; // Corrected typo
    }
};

const OTP_verify = async (otp_id, otp) => {
    try {
        const otpRecord = await OTP.findOne({ otpId: otp_id });
        if (!otpRecord) {
            return { status: 0, message: "OTP record not found." };
        }
        if (new Date() > otpRecord.expiresAt) {
            return { status: 0, message: "OTP has expired." };
        }
        const isMatch = await bcrypt.compare(otp, otpRecord.OTP);
        if (!isMatch) {
            return { status: 0, message: "Invalid OTP." };
        }
        return { status: 1, message: "OTP verified successfully." };
    } catch (error) {
        console.log(error);
        return { status: 0, message: error.message };
    }
};

module.exports = { OTP_create, OTP_verify };
