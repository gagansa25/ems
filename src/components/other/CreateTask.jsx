import React from 'react'

const CreateTask = () => {
  return (
   <div className='mt-10 bg-grey p-8 rounded-xl shadow-md w-full'>

        <form className='flex gap-10'>

          {/* Left Section */}
          <div className='w-1/2 flex flex-col gap-4'>

            <div>
              <h3 className='font-medium mb-1'>Task Title</h3>
              <input
                type="text"
                placeholder='Make a UI Design'
                className='border rounded p-2 w-full'
              />
            </div>

            <div>
              <h3 className='font-medium mb-1'>Date</h3>
              <input
                type="date"
                className='border rounded p-2 w-full'
              />
            </div>

            <div>
              <h3 className='font-medium mb-1'>Assign To</h3>
              <input
                type="text"
                placeholder='Employee name'
                className='border rounded p-2 w-full'
              />
            </div>

            <div>
              <h3 className='font-medium mb-1'>Category</h3>
              <input
                type="text"
                placeholder='Design, Dev, etc'
                className='border rounded p-2 w-full'
              />
            </div>

          </div>


          {/* Right Section */}
          <div className='w-1/2 flex flex-col gap-4'>

            <div>
              <h3 className='font-medium mb-1'>Description</h3>
              <textarea
                rows="8"
                className='border rounded p-2 w-full'
                placeholder='Enter task description...'
              ></textarea>
            </div>

            <button className='bg-blue-500 text-white py-3 rounded mt-6 hover:bg-blue-600'>
              Create Task
            </button>

          </div>

        </form>

      </div>
  )
}

export default CreateTask
