import React from 'react'

const AddUserModal = ({ setIsModalOpen, userName, setUserName, handleAddUser }) => {


    return (
            <div
                className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center backdrop-blur-[10px]">
                    
                <div
                    className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
                    <div className='flex px-5 py-3 justify-end font-bold text-xl cursor-pointer'
                    onClick={() => setIsModalOpen(false)}>
                        X
                    </div>
                    <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                        Add a new user
                    </div>
                    <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                        <input type='text' className='w-full px-6 py-2 border-3 border-black' placeholder="Add User's Name" onChange={(e) => setUserName(e.target.value)} value={userName}/>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                        <button className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button"
                        onClick={() => {
                            setIsModalOpen(false)
                            handleAddUser()
                            }
                        }>
                            Add
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default AddUserModal
