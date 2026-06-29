import React from 'react'

const getStatus = (task) => {
  if (task.completed) return 'Completed'
  if (task.failed) return 'Failed'
  if (task.active) return 'Active'
  return 'New'
}

const getStatusClass = (task) => {
  if (task.completed) return 'bg-green-500/20 text-green-300'
  if (task.failed) return 'bg-red-500/20 text-red-300'
  if (task.active) return 'bg-blue-500/20 text-blue-300'
  return 'bg-yellow-500/20 text-yellow-200'
}

const AllTask = ({ employees, completedTasks }) => {
  const allTasks = employees.flatMap((employee) =>
    employee.tasks.map((task, index) => ({
      ...task,
      employeeEmail: employee.email,
      employeeId: employee.id,
      id: `${employee.id}-${index}-${task.taskTitle}`,
    })),
  )

  return (
    <div className='mt-8 rounded-lg bg-[#1C1C1C] p-5'>
      <div className='mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-end'>
        <div>
          <h2 className='text-2xl font-semibold'>Admin Panel</h2>
          <p className='mt-1 text-sm text-gray-300'>Control all employees and review every assigned task.</p>
        </div>
        <p className='text-sm text-gray-300'>{completedTasks} completed tasks</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[760px] border-separate border-spacing-y-2 text-left'>
          <thead>
            <tr className='text-sm text-gray-400'>
              <th className='px-4 py-2 font-medium'>Employee</th>
              <th className='px-4 py-2 font-medium'>Task</th>
              <th className='px-4 py-2 font-medium'>Category</th>
              <th className='px-4 py-2 font-medium'>Date</th>
              <th className='px-4 py-2 font-medium'>Status</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((task) => (
              <tr key={task.id} className='bg-[#111]'>
                <td className='rounded-l px-4 py-3'>
                  <p className='font-medium'>Employee {task.employeeId}</p>
                  <p className='text-sm text-gray-400'>{task.employeeEmail}</p>
                </td>
                <td className='px-4 py-3'>
                  <p className='font-medium'>{task.taskTitle}</p>
                  <p className='line-clamp-1 text-sm text-gray-400'>{task.taskDescription}</p>
                </td>
                <td className='px-4 py-3'>{task.category}</td>
                <td className='px-4 py-3'>{task.taskDate}</td>
                <td className='rounded-r px-4 py-3'>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(task)}`}>
                    {getStatus(task)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllTask
