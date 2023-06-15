import { useEffect, useState } from 'react';

const MePage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/me');
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    console.error('Failed to fetch user information');
                }
            } catch (error) {
            console.error('An error occurred while fetching user information:', error);
            } 
        };
        fetchUserInfo();
    }, []);

    return (
        <div>
            <h1>My Profile</h1>
            {userInfo ? (
                <div>
                <p>Email: {userInfo.email}</p>
                <p>ID: {userInfo.id}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MePage;