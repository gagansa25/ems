import React from 'react'

const TaskList = () => {
  return (
    <div
      id='task-list'
      className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 px-5 mt-10'
    >

      <div className='flex-shrink-0 w-[300px] p-5 h-full bg-red-400 rounded-xl'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>High</h3>
          <h4 className='text-sm'>12 March 2026</h4>
        </div>
           <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
           <p className='text-sm mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, et eligendi rem assumenda soluta iure!
           </p>
      </div>
       <div className='flex-shrink-0 w-[300px] p-5 h-full bg-blue-400 rounded-xl'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>High</h3>
          <h4 className='text-sm'>12 March 2026</h4>
        </div>
           <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
           <p className='text-sm mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, et eligendi rem assumenda soluta iure!
           </p>
      </div>
       <div className='flex-shrink-0 w-[300px] p-5 h-full bg-green-400 rounded-xl'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>High</h3>
          <h4 className='text-sm'>12 March 2026</h4>
        </div>
           <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
           <p className='text-sm mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, et eligendi rem assumenda soluta iure!
           </p>
      </div>
       <div className='flex-shrink-0 w-[300px] p-5 h-full bg-yellow-400 rounded-xl'>
        <div className='flex justify-between items-center'>
          <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>High</h3>
          <h4 className='text-sm'>12 March 2026</h4>
        </div>
           <h2 className='mt-5 text-2xl font-semibold'>Make a youtube video</h2>
           <p className='text-sm mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, et eligendi rem assumenda soluta iure!
           </p>
      </div>

    </div>
  )
}

export default TaskList