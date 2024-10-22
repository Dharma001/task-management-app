import React from 'react'

const Home: React.FC = () => {

  return (
    <>
    <div className="w-full h-screen">
      <div className="div grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 border border-gray-400">
          <p>div1</p>
        </div>
        <div className="p-4 border border-gray-400">
          <p>div1</p>
        </div>
        <div className="p-4 border border-gray-400">
          <p>div1</p>
        </div>
        <div className="p-4 border border-gray-400">
          <p>div1</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;