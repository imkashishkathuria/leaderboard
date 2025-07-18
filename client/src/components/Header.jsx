import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import AddUserModal from './AddUserModal';
import CongratsModal from './CongratsModal';

const Header = () => {

    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [showCongrats, setShowCongrats] = useState(false);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch((err) => console.log("Failed to fetch users", err))
    },

        [])

    const handleAddUser = async () => {
        if (!userName.trim()) return;
        try {
            const res = await fetch("http://localhost:5000/api/add-user", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName })
            })

            const data = await res.json();

            if (res.ok) {
                console.log("user added", data.user);
                setUserName('');
                setIsModalOpen(false);
                const allUsers = await fetch("http://localhost:5000/api/users").then(res => res.json());
                setUserData(allUsers);
            } else {
                console.log("Failed to add user", data.error)
            }
        }
        catch (err) {
            console.log("Failed to add user", err);
        }

    }

    const handleClaim = async (userId, userPoints) => {
        try {

            const res = await fetch(`http://localhost:5000/api/claim/${userId}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ totalPoints: userPoints })
            })

            const data = await res.json();
            if (res.ok) {
                console.log("Points claimed", data);
                setPoints(data.points);

                setUserData(prev => {
                    const updated = prev.map(user =>
                        user._id === userId ?
                            { ...user, totalPoints: user.totalPoints + data.points }
                            : user
                    );
                    return updated.sort((a, b) => b.totalPoints - a.totalPoints);
                }
                )
                setShowCongrats(true);

            } else {
                console.log("Failed claiming points")
            }
        } catch (error) {
            console.log("Failed claiming points", error)
        }

    }

    return (
        <div className='flex flex-col bg-blue-400'>
            <div className='flex flex-col gap-2 justify-center items-center  py-5 bg-violet-950 border-b-0 rounded-b-[200px]'>
                <p className='text-5xl text-white font-bold'>
                    Leaderboard
                </p>
                <div className='flex gap-20 justify-between  py-5'>

                    {
                        userData.slice(0, 3).map((item, idx) => {
                            let positionStyle = '';
                            let sizeClass = 'w-20 h-20';
                            if (idx === 0) { positionStyle = "order-2"; sizeClass = "w-30 h-30"; }
                            if (idx === 1) positionStyle = "order-1 mt-8";
                            if (idx === 2) positionStyle = "order-3 mt-8";
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
            <div className='flex px-5  py-5 justify-center'>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-violet-950 text-white font-semibold text-xl">
                            <th className="px-6 py-3 text-center">RANK</th>
                            <th className="px-10 py-3 text-center">USER</th>
                            <th className="px-6 py-3 text-center">SCORE</th>
                            <th className="px-6 py-3 text-center">CLAIM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((item, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-[-32px]  py-3 flex items-center gap-4">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTML0gExaohZHdZW3609F12nUmVc14WXYNx_w&s"
                                            className="w-10 h-10 rounded-full"
                                            alt="avatar"
                                        />
                                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                    </td>
                                    <td className="px-10 py-3">{item.totalPoints}</td>
                                    <td className="px-2 py-3">
                                        <button className="bg-violet-600  cursor-pointer hover:bg-violet-700 text-white px-3 py-1 rounded"
                                            onClick={() => handleClaim(item._id, item.totalPoints)}>
                                            <div className='flex gap-2 items-center'>
                                                Claim
                                                <img src='/trophy.png' className='w-10 h-10 rounded-full' />
                                            </div>

                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>


            </div>
            <div className='flex items-center justify-center py-5'>
                <button className='bg-violet-950 text-white px-6 py-3 rounded-full font-bold hover:bg-violet-950/80 cursor-pointer '
                    onClick={() => setIsModalOpen(true)}>
                    Add User +
                </button>

            </div>
            {isModalOpen && (
                <AddUserModal setIsModalOpen={setIsModalOpen} userName={userName} setUserName={setUserName} handleAddUser={handleAddUser} />
            )}

            <CongratsModal points={points} show={showCongrats} onClose={() => setShowCongrats(false)} />
        </div>
    )
}

export default Header
