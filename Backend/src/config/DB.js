const mongoose = require("mongoose");

const Dbconnect = async(url)=>{
    try {
        await mongoose.connect(url)
        console.log("Mongodb Connction established")
    } catch (error) {
        console.log(`we are facing error while connection Mongodb ${error}`)
    }
}

module.exports = {Dbconnect}