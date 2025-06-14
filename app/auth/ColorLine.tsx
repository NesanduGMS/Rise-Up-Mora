import React from 'react'

export default function ColorLine() {
  return (
    <div className='flex'>
        <div className="h-[80vh] w-[4px] rounded-[100%_0_0_100%] bg-white"
      style={{
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(12,39,53,1) 50%, rgba(255,255,255,1) 100%)',
      }}>

        </div>
        <div className="h-[80vh] w-[4px] rounded-none bg-white"
      style={{
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(40,168,224,1) 50%, rgba(255,255,255,1) 100%)',
      }}></div>
      <div className="h-[80vh] w-[4px] rounded-[0_100%_100%_0] bg-white"
      style={{
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(241,194,50,1) 50%, rgba(255,255,255,1) 100%)',
      }}></div>
      
    </div>
  )
}
