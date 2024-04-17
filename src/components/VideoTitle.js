import React from 'react'

const VideoTitle = ({title , overview} ) => {

  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-5xl font-bold'>{title}</h1>
        <p className='py-6 text-base w-1/4'>{overview}</p>
        <div>
            <button className='bg-white text-black p-3 px-12 text-xl  rounded-lg hover:bg-opacity-80'>
            <ion-icon name="play-sharp"></ion-icon>
             <span>play</span>
            </button>
            <button className='mx-2 bg-gray-500 text-white p-3 px-16 text-xl bg-opacity-50 rounded-lg'>
            <ion-icon name="information-circle-outline"></ion-icon>
              More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle 