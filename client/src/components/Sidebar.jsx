// 'use client';
import React, { useEffect, useState } from 'react';

const Sidebar = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            //  console.log("Fetching sidebar data...");
            fetch("http://localhost:5000/api/users")
                .then(res => res.json())
                .then(data => setUserData([...data]))
                .catch((err) => console.log("Failed to fetch users", err));
        };

        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className='flex flex-col'>
            <p className='text-8xl text-blue-400 font-bold'>Leaderboard</p>
            <p className='px-5 py-2 text-center text-white'>
                Track the top performers in real-time with our dynamic leaderboard.
                Celebrate achievements and stay motivated with live rankings!
            </p>

            <div className='flex flex-col gap-2 justify-center items-center py-5'>
                <div className='flex gap-7 justify-between py-5'>
                    {
                        userData.slice(0, 3).map((item, idx) => {
                            let positionStyle = '';
                            let sizeClass = 'w-35 h-35';
                            if (idx === 0) { positionStyle = "order-2"; sizeClass = "w-45 h-45"; }
                            if (idx === 1) positionStyle = "order-1 mt-8 ";
                            if (idx === 2) positionStyle = "order-3 mt-12";
                            return (
                                <div key={idx} className={`flex flex-col items-center py-2 ${positionStyle}`}>
                                    <p className='text-lg text-white font-bold'></p>
                                    <div className='relative flex flex-col items-center'>
                                        {idx === 0 && (<img src="/trophy3.png" className='w-17 h-17 absolute -top-10 z-10 ' />)}
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTML0gExaohZHdZW3609F12nUmVc14WXYNx_w&s' className={`rounded-full ${sizeClass}`} />
                                    </div>

                                    <p className='text-md text-white font-bold'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                                    <p className='text-xl text-white font-bold'>
                                        {item.totalPoints}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
