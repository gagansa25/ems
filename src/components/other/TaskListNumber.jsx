import React from 'react'

const TaskListNumber = ({ tasks }) => {
  const newTasks = tasks.filter((task) => task.newTask).length
  const completedTasks = tasks.filter((task) => task.completed).length
  const acceptedTasks = tasks.filter((task) => task.active).length
  const failedTasks = tasks.filter((task) => task.failed).length

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-4">

      <div className="rounded-xl bg-red-400 py-6 px-9">
        <h2 className="text-3xl font-semibold">{newTasks}</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
      <div className="rounded-xl bg-blue-400 py-6 px-9">
        <h2 className="text-3xl font-semibold">{completedTasks}</h2>
        <h3 className="text-xl font-medium">Completed Task</h3>
      </div>
      <div className="rounded-xl bg-green-400 py-6 px-9">
        <h2 className="text-3xl font-semibold">{acceptedTasks}</h2>
        <h3 className="text-xl font-medium">Accepted Task</h3>
      </div>
      <div className="rounded-xl bg-yellow-400 py-6 px-9">
        <h2 className="text-3xl font-semibold">{failedTasks}</h2>
        <h3 className="text-xl font-medium">Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber
