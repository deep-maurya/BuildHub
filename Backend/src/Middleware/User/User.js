const { UserModel } = require("../../Models/User");

const Personal_Details = async (req,res) => {
    const student_id = req.student.student_id;
    try {
        const data = await UserModel.findOne({_id:student_id});
        res.json(data)
    } catch (error) {
        res.json({messege:error})
    }
}

module.exports = {
    Personal_Details
}