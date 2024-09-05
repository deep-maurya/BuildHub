const { UserModel } = require("../../Models/User");

const Personal_Details_instructor = async (req,res) => {
    const instructor_id = req.instructor.instructor_id;
    console.log(instructor_id)
    try {
        const data = await UserModel.findOne({_id:instructor_id},{password:0});
        return res.json(data)
    } catch (error) {
        return res.json({messege:error})
    }
}


module.exports = {
    Personal_Details_instructor
}