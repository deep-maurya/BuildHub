import { BookAIcon, Captions, FileText, TrendingUp } from "lucide-react";
import React from "react";

export const Feature2 = () => {
  return (
    <div className="bg-gray-100 ">
        <div  className="mx-auto py-32   max-w-7xl px-2 lg:px-8">
            <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
                <div className="">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <FileText/>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                    Session Management
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                    Easily manage and schedule sessions, track attendance, and update
                    session details with our intuitive session management tools.
                </p>
                </div>

                <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                    <BookAIcon/>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                    Attendance Tracking
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                    Track student attendance with ease, mark absences, and generate
                    attendance reports for efficient session management.
                </p>
                </div>

                <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <Captions/>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                    Assignment Submissions
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                    Manage assignments with deadlines, track submissions, and provide
                    feedback to enhance the learning experience.
                </p>
                </div>

                <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <TrendingUp/>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-black">
                    Progress Monitoring
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                    Monitor student progress through detailed analytics and reports,
                    helping you identify areas that need improvement.
                </p>
                </div>
            </div>
        </div>
    </div>
  );
};
