// Components/Drawer.js
import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CourseListDrawer } from './CourseListDrawer';

const Drawer = ({ open, onClose, batch }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="p-5 bg-violet-200 text-center text-base font-bold leading-6 text-violet-900">
                    {batch?.name || 'Batch Details'}
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                <div className="flex text-center">
                  <h3 className="mb-3 p-3 basis-1/2 border font-bold text-gray-500 ">
                    Total Courses
                    <br />
                    <span style={{ fontSize: "30px" }}>{batch?.stats?.totalCourses}</span>
                  </h3>
                  <h3 className="mb-3 p-3 basis-1/2 border font-bold text-gray-500">
                    Total Student
                    <br />
                    <span style={{ fontSize: "30px" }}>{batch?.stats?.totalStudents}</span>
                  </h3>
                </div>

                {batch?.courses && batch?.courses.length>0 && (<>
                  <CourseListDrawer  courses={batch.courses}/>
                </>)}
                {batch?.courses && batch?.courses.length===0 && (<>
                  <div className="text-center font-bold text-red p-4 bg-red-200">
                    No courses in this Batch
                  </div>
                </>)}
                 
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
