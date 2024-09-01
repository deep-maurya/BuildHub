const jwt = require('jsonwebtoken');
require("dotenv").config();

// Function to create a token
const create_token = (payload, time = '5m') => {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: time });
};

// Function to verify a token
const verify_token = async (token) => {
    try {
        // Verify and decode the token
        const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return { status: true, decode: decoded }; // Token is valid and decoded data is returned
    } catch (error) {
        return { status: false, decode: null }; // Token is invalid or expired
    }
};

module.exports = { create_token, verify_token };
