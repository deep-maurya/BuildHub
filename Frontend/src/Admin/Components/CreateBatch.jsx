// Components/CreateBatch.js
import React, { useState, useEffect } from "react";
import { AxioGet, AxioPost } from "../../utils/AxiosUtils";
import Swal from "sweetalert2";
import { Loading } from "../../Components/Utils/Loading";
import Drawer from "./Drawer";


const CreateBatch = () => {
  const [open, setOpen] = useState(true);
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchBatches = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await AxioGet("admin/batch");
        if (response.data.status === 1) {
          setBatches(response.data.data);
          setFilteredBatches(response.data.data);
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

  useEffect(() => {
    if (filter === "Active") {
      setFilteredBatches(batches.filter(batch => batch.stats.totalCourses > 0));
    } else if (filter === "Inactive") {
      setFilteredBatches(batches.filter(batch => batch.stats.totalCourses === 0));
    } else {
      setFilteredBatches(batches);
    }
  }, [filter, batches]);

  const handleMoreInfoClick = (batch) => {
    setSelectedBatch(batch);
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxioPost("admin/batch/create", {
        batchName,
      });
      if (response.data.status === 1) {
        setBatchName("");
        setIsModalOpen(false);
        const newBatch = {
          _id: response.data.data._id,
          name: batchName,
          stats: { totalCourses: 0, totalStudents: 0 },
        };
        setBatches([...batches, newBatch]);
        Swal.fire({
          position: "center",
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <section className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Batches</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all batches. You can add new batches or view existing ones.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md bg-gray-500 px-3 py-2 pr-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Create Batch
          </button>
        </div>
      </section>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBatches.map((batch) => (
              <div key={batch._id} className="flex-1 bg-white p-4">
                <a href="#">
                  {batch.stats.totalCourses > 0 ? (
                    <span className="mb-2 inline-flex bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="mb-2 inline-flex bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                      Inactive
                    </span>
                  )}
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{batch.name}</h5>
                </a>
                <div className="flex text-center justify-between">
                  <h3 className="mb-3 font-bold text-gray-500 ">
                    Total Courses
                    <br />
                    <span style={{ fontSize: "30px" }}>{batch.stats.totalCourses}</span>
                  </h3>
                  <h3 className="mb-3 font-bold text-gray-500">
                    Total Student
                    <br />
                    <span style={{ fontSize: "30px" }}>{batch.stats.totalStudents}</span>
                  </h3>
                </div>
                <hr />
                <div className="text-center mt-3">
                  <button
                    onClick={() => handleMoreInfoClick(batch)}
                    className="mt-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create a New Batch
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="batchName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Batch Name
                </label>
                <input
                  type="text"
                  id="batchName"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter batch name"
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
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Create Batch
              </button>
              </div>
              </form>
          </div>
        </div>
      )}

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        batch={selectedBatch}
      />
    </div>
  );
};

export default CreateBatch;

                
