const { Schema, model } = require("mongoose");

const Batch = new Schema({
    name: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})
const BatchModel = new model('Batch',Batch);

module.exports = {BatchModel}