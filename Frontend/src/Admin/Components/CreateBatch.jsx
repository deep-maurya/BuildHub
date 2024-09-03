import React, { useState, useEffect } from 'react';
import { AxioGet, AxioPost } from '../../utils/AxiosUtils';
import Swal from 'sweetalert2';

const CreateBatch = () => {
  const [batches, setBatches] = useState([]);
  const [batchName, setBatchName] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    // Fetch the list of batches
    const fetchBatches = async () => {
      setIsLoading(true); // Start loading
      setError(''); // Reset error message

      try {
        const response = await AxioGet('admin/batch'); // Adjust the endpoint as needed
        if (response.data.status === 1) {
          setBatches(response.data.data); // Assuming response.data.data is an array of batches
        } else {
          setError('Failed to fetch batches. Please try again.');
        }
      } catch (error) {
        setError('Failed to fetch batches. Please try again.');
        console.error('Failed to fetch batches:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchBatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxioPost('admin/batch/create', {
        batchName,
      });
      console.log(response);
      if (response.data.status === 1) {
        setMessage('Batch created successfully!');
        setBatchName('');
        setIsModalOpen(false); // Close the modal after successful creation
        // Add the new batch directly to the list
        setBatches([
          ...batches,
          { _id: response.data.data._id, name: batchName, stats: { totalCourses: 0, totalStudents: 0 }, courses: [], students: [] },
        ]);
        Swal.fire({
          position: "center",
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 3500
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      setMessage('Failed to create batch. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <section className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Batches</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all batches. You can add new batches or view existing ones.
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Create Batch new
          </button>
        </div>
      </section>
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className=" border border-gray-200 md:rounded-lg">
              <table className="min-w-full overflow-auto divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr className='text-center'>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-gray-700"
                    >
                      <span>Batch Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-gray-700"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-gray-700"
                    >
                      Courses
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-gray-700"
                    >
                      Students
                    </th>
                    <th scope="col" className="relative px-4 py-3.5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-600">Loading batches...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-red-500">{error}</td>
                    </tr>
                  ) : (
                    batches.map((batch) => (
                      <tr key={batch._id} className='text-center'>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">{batch.name}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {batch.stats.totalCourses > 0 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {batch.stats.totalCourses}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {batch.stats.totalStudents}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <a href="#" className="text-gray-700">
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating Batch */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">Create a New Batch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="batchName" className="block text-gray-700 text-sm font-bold mb-2">
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Create Batch
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBatch;
