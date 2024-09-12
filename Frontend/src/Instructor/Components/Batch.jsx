// Components/CreateBatch.js
import React, { useState, useEffect } from "react";
import { AxioGet, AxioPost } from "../../utils/AxiosUtils";
import Swal from "sweetalert2";
import { Loading } from "../../Components/Utils/Loading";
import { formatDateTime } from "../../utils/DateConvert";
import schedule from "../../../public/schedule.png"
const Batch = () => {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [sessionTitle, setSessionTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [modelsubmitButtonDisable,setmodelsubmitButtonDisable] = useState(false);

  useEffect(() => {
    const fetchBatches = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await AxioGet("instructor/batch");
        if (response.data.data) {
          console.log(response.data.data)
          setBatches(response.data.data);
        } else {
          setError("Failed to fetch batches. Please try again.");
        }
      } catch (error) {
        setError("Failed to fetch batches. Please try again.");
        console.error("Failed to fetch batches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const handleAddSessionClick = (batch, course) => {
    setSelectedBatch({ batch, course });
    setIsModalOpen(true);
  };

  const handleSubmitSession = async (e) => {
    setmodelsubmitButtonDisable(true);
    e.preventDefault();
    if (!sessionTitle || !startDateTime || !endDateTime) {
      Swal.fire("Error", "Please fill all the fields.", "error");
      return;
    }
    const formattedStartDateTime = formatDateTime(startDateTime);
    const formattedEndDateTime = formatDateTime(endDateTime);
    const newSession = {
      sessionTitle,
      startDateTime: formattedStartDateTime,
      endDateTime: formattedEndDateTime,
      course_id: selectedBatch.course.courseId,
      batch_id: selectedBatch.batch.batchId,
    };

    try {
      const response = await AxioPost("instructor/session/create", newSession);
      console.log(response)
      if (response.data.status === 1) {
        Swal.fire({
            position: "center",
            icon: "success",
            text: "Session created successfully",
            showConfirmButton: false,
            timer: 3500,
        });
        setIsModalOpen(false);
        setSessionTitle("");
        setStartDateTime("");
        setEndDateTime("");
      } else {
        Swal.fire({
            position: "center",
            icon: "warning",
            text: response.data.message,
            showConfirmButton: false,
            timer: 3500,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to create session. Please try again.", "error");
    } finally {
      setmodelsubmitButtonDisable(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {batches.length!=0 && batches.map((batch) =>
            batch.courses.map((course) => (
              <div key={course.courseId} className=" bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-500">
                    {batch.batchName} <br/> <span className="text-black text-2xl">{course.courseTitle}</span>
                    <p className="font-medium">{course.courseDescription}</p>
                  </h3>
                  <button
                    onClick={() => handleAddSessionClick(batch, course)}
                    className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Create Session
                  </button>
                </div>
              </div>
            ))
          )}
          {batches.length===0 && <>
            <div className="flex flex-col items-center pb-10 rounded-s-xl p-5 py-9 bg-white">
                <img className="w-24 h-24 mt-10 mb-3 mb-5" src={schedule} alt="Bonnie image"/>
                <h1 className='mb-10 font-black text-center text-neutral-500 text-3xl'>No course Assigned To you!</h1>
            </div>
          </>}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create a New Session
            </h2>
            <form onSubmit={handleSubmitSession}>
              <div className="mb-4">
                <label
                  htmlFor="sessionTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Session Title
                </label>
                <input
                  type="text"
                  id="sessionTitle"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter session title"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startDateTime"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Start DateTime
                </label>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDateTime"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  End DateTime
                </label>
                <input
                  type="datetime-local"
                  id="endDateTime"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex space-between gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Close
                </button>
                <button
                  disabled={modelsubmitButtonDisable}
                  type="submit"
                  className="bg-violet-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  {modelsubmitButtonDisable?"Session Creating...":"Create Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Batch;
