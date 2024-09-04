import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { AxioPost } from '../../utils/AxiosUtils';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [is_disable, set_disable] = useState(false);
    const [role, setRole] = useState('admin'); // Default role
    const navigate = useNavigate();

    const handle_login = async (e) => {
        e.preventDefault();
        set_disable(true);
        let endpoint = '';
        let redirect = ''

        // Set endpoint based on role
        switch (role) {
            case 'admin':
                endpoint = 'admin/login';
                redirect = 'admin/dashboard'
                break;
            case 'instructor':
                endpoint = 'instructor/login';
                redirect = 'instructor/dashboard'
                break;
            case 'student':
                endpoint = 'user/login';
                redirect = 'dashboard'
                break;
            default:
                endpoint = 'student/login';
        }

        try {
            const response = await AxioPost(endpoint, { email, password });
            setError(response.data.message);

            if (response.data.status === 1) {
                setError('');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate(`/${redirect}`);
                }, 1500);
            }
        } catch (err) {
            setError("Try Again Later");
            if (err.response) {
                setError(err.response.data.message);
                console.error('Error response:', err.response.data);
            } else if (err.request) {
                console.error('Error request:', err.request);
            } else {
                console.error('Error:', err.message);
            }
        } finally {
            set_disable(false);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm w-full md:mx-auto md:w-1/2 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        {/* Place logo here if needed */}
                    </div>
                    <h2 className="text-center mb-5 text-2xl font-bold leading-tight text-black">
                        <div className="mb-2">LOGIN </div>
                        <hr />
                    </h2>
                    {error && (
                        <div className="rounded-md mb-5 border-l-4 border-yellow-500 bg-yellow-100 p-4">
                            <div className="flex items-center space-x-4">
                                <AlertCircle className="h-6 w-6 text-yellow-600" />
                                <p className="text-sm font-medium text-yellow-600">{error}</p>
                            </div>
                        </div>
                    )}
                    <div className="border rounded-md p-5">
                        <form onSubmit={handle_login} method='post'>
                            <div className="space-y-5">
                                <div className="flex justify-between gap-4">
                                    {/* Role Selection Radio Buttons */}
                                    <div className="border p-3 flex items-center">
                                        <input
                                            id="radio-admin"
                                            type="radio"
                                            value="admin"
                                            name="role"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            checked={role === 'admin'}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label htmlFor="radio-admin" className="ms-2 text-sm font-medium text-gray-900">Admin</label>
                                    </div>
                                    <div className="border p-3 flex items-center">
                                        <input
                                            id="radio-instructor"
                                            type="radio"
                                            value="instructor"
                                            name="role"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            checked={role === 'instructor'}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label htmlFor="radio-instructor" className="ms-2 text-sm font-medium text-gray-900">Instructor</label>
                                    </div>
                                    <div className="border p-3 flex items-center">
                                        <input
                                            id="radio-student"
                                            type="radio"
                                            value="student"
                                            name="role"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            checked={role === 'student'}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label htmlFor="radio-student" className="ms-2 text-sm font-medium text-gray-900">Student</label>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">Email ID</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                                        <Link to={'/forget_password'} className="text-sm font-semibold text-black hover:underline">Forgot password?</Link>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={`inline-flex w-full items-center justify-center rounded-md ${is_disable ? 'bg-stone-500' : 'bg-stone-900'} px-3.5 py-2.5 font-semibold leading-7 text-white ${is_disable ? '' : 'hover:bg-black/80'}`}
                                        disabled={is_disable}
                                    >
                                        {is_disable ? 'Loading....' : <>Get started <ArrowRight className="ml-2" size={16} /></>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
