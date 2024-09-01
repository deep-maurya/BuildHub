import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Cookie = () => {
    const [sessionStatus, setSessionStatus] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:9090/user/check-session', {
                    withCredentials: true // Ensure cookies are sent with the request
                });
                console.log(response)
                setSessionStatus(response.data);
            } catch (err) {
                console.error('Session check error:', err);
                setSessionStatus({ status: 0, message: 'No active session' });
            }
        };

        checkSession();
    }, []);

    return (
        <div>
            {sessionStatus ? (
                <div>
                    <h2>Session Status</h2>
                    <p>{sessionStatus.message}</p>
                    {sessionStatus.status === 1 && (
                        <div>
                            <p>Email: {sessionStatus.email}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Checking session...</p>
            )}
        </div>
    );
};
