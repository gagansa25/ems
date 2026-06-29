import React from 'react'

const getCardColor = (task) => {
  if (task.completed) return 'bg-blue-400'
  if (task.failed) return 'bg-yellow-400'
  if (task.active) return 'bg-green-400'
  return 'bg-red-400'
}

const getStatus = (task) => {
  if (task.completed) return 'Completed'
  if (task.failed) return 'Failed'
  if (task.active) return 'Active'
  return 'New'
}

const TaskList = ({ employeeId, tasks, handleUpdateTaskStatus }) => {
  return (
    <div
      id='task-list'
      className='mt-10 flex h-[55vh] w-full flex-nowrap items-stretch justify-start gap-5 overflow-x-auto px-1 py-5'
    >
      {tasks.map((task, index) => (
        <div key={`${task.taskTitle}-${index}`} className={`flex h-full w-[320px] flex-shrink-0 flex-col rounded-xl p-5 ${getCardColor(task)}`}>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='rounded bg-[#111]/25 px-3 py-1 text-sm font-semibold'>{task.category}</h3>
            <h4 className='text-sm font-medium'>{task.taskDate}</h4>
          </div>

          <h2 className='mt-5 text-2xl font-semibold'>{task.taskTitle}</h2>
          <p className='mt-2 flex-1 overflow-auto text-sm leading-6'>{task.taskDescription}</p>

          <div className='mt-5 flex items-center justify-between gap-3'>
            <span className='inline-flex rounded-full bg-[#111]/25 px-3 py-1 text-sm font-semibold'>
              {getStatus(task)}
            </span>
            {(task.active || task.newTask) && (
              <span className='rounded-full bg-white/25 px-3 py-1 text-sm font-semibold'>
                Ongoing
              </span>
            )}
          </div>

          {(task.active || task.newTask) && (
            <div className='mt-4 grid grid-cols-2 gap-3'>
              <button
                onClick={() => handleUpdateTaskStatus(employeeId, index, 'completed')}
                className='rounded bg-[#111]/80 px-3 py-2 text-sm font-semibold text-white hover:bg-[#111]'
              >
                Complete
              </button>
              <button
                onClick={() => handleUpdateTaskStatus(employeeId, index, 'failed')}
                className='rounded bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800'
              >
                Failed
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskList
