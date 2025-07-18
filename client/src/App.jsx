import React from 'react'
import Header from './components/Header'
import Leaderboard from './components/Leaderboard'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <div className='flex justify-between gap-30 px-40 py-15 bg-[#6f14e6]'>
      <div className='flex flex-col'>
      <Header />
      <Leaderboard />
      </div>
    <Sidebar /> 
    </div>
  )
}

export default App
