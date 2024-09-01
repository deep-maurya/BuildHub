const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
// Define the User schema with appropriate fields
const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mobile: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        required: true,
        default: 'student'
    },
    tokens: [{ 
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String
        },
        scope: {
            type: [String] 
        }
    }]
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// Create the User model
const UserModel = model("Users", UserSchema);

module.exports = { UserModel };
