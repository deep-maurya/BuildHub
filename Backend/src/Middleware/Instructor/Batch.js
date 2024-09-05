const { default: mongoose } = require("mongoose");
const { BatchModel } = require("../../Models/Batch");
const { courseModel } = require("../../Models/Course");


const all_batch_to_instructor = async (req, res) => {
    try {
        // Extract the instructor ID from the request object
        const instructor_id = req.instructor.instructor_id; 

        // Optional: Check if instructor_id is valid
        if (!mongoose.Types.ObjectId.isValid(instructor_id)) {
            return res.status(400).json({ message: 'Invalid instructor ID' });
        }

        // Find courses where the instructor matches the provided ID
        const courses = await courseModel.find({ instructor: instructor_id })
            .populate('batchID', 'name') // Populate batch to include only the 'name' field
            .exec();

        // Group courses by batch names
        const batchesWithCourses = courses.reduce((acc, course) => {
            const batchId = course.batchID._id.toString(); // Extract batch ID
            const batchName = course.batchID.name; // Extract batch name

            // Initialize the batch in the accumulator if not already present
            if (!acc[batchId]) {
                acc[batchId] = { 
                    batchName, 
                    batchId,
                    courses: [] 
                };
            }

            // Add course details to the batch
            acc[batchId].courses.push({
                courseId: course._id.toString(),
                courseTitle: course.title,
                courseDescription: course.description,
            });

            return acc;
        }, {});

        // Convert the object into an array for easier response formatting
        const result = Object.values(batchesWithCourses);

        // Respond with the grouped batches and their respective courses
        return res.json({ 
            message: 'Batches and courses retrieved successfully', 
            data: result 
        });
    } catch (error) {
        console.error('Error fetching batches and courses:', error);
        return res.status(500).json({ message: 'Error fetching batches and courses', error: error.message });
    }
}




module.exports = {
    all_batch_to_instructor
}