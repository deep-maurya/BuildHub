import React from 'react'

export const CourseListDrawer = ({courses}) => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Courses</h2>
      <button className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
        Add Course
      </button>
      </div>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course._id}
            className="p-4 bg-white border  hover:bg-gray-100 transition"
          >
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <div className="text-sm text-gray-500">
              <strong>Instructor:</strong>{' '}
              {course.instructor ? course.instructor.name : 'No Instructor'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
