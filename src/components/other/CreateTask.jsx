import React, { useState } from 'react'

const initialForm = {
  taskTitle: '',
  taskDate: '',
  employeeId: '',
  category: '',
  taskDescription: '',
}

const CreateTask = ({ employees, handleCreateTask }) => {
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const task = {
      active: true,
      newTask: true,
      completed: false,
      failed: false,
      taskTitle: formData.taskTitle,
      taskDescription: formData.taskDescription,
      taskDate: formData.taskDate,
      category: formData.category,
    }

    handleCreateTask(formData.employeeId, task)
    setFormData(initialForm)
  }

  return (
    <div className='mt-8 rounded-lg bg-[#1C1C1C] p-6 shadow-md'>
      <div className='mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end'>
        <div>
          <h2 className='text-2xl font-semibold'>Create Task</h2>
          <p className='mt-1 text-sm text-gray-300'>Assign work to a specific employee.</p>
        </div>
      </div>

      <form onSubmit={submitHandler} className='grid gap-5 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <div>
            <h3 className='mb-1 font-medium'>Task Title</h3>
            <input
              name='taskTitle'
              value={formData.taskTitle}
              onChange={handleChange}
              required
              type='text'
              placeholder='Make a UI Design'
              className='w-full rounded border border-white/10 bg-[#111] p-3 outline-none focus:border-emerald-500'
            />
          </div>

          <div>
            <h3 className='mb-1 font-medium'>Date</h3>
            <input
              name='taskDate'
              value={formData.taskDate}
              onChange={handleChange}
              required
              type='date'
              className='w-full rounded border border-white/10 bg-[#111] p-3 outline-none focus:border-emerald-500'
            />
          </div>

          <div>
            <h3 className='mb-1 font-medium'>Assign To</h3>
            <select
              name='employeeId'
              value={formData.employeeId}
              onChange={handleChange}
              required
              className='w-full rounded border border-white/10 bg-[#111] p-3 outline-none focus:border-emerald-500'
            >
              <option value=''>Select employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  Employee {employee.id} - {employee.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className='mb-1 font-medium'>Category</h3>
            <input
              name='category'
              value={formData.category}
              onChange={handleChange}
              required
              type='text'
              placeholder='Design, Dev, Reports'
              className='w-full rounded border border-white/10 bg-[#111] p-3 outline-none focus:border-emerald-500'
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex-1'>
            <h3 className='mb-1 font-medium'>Description</h3>
            <textarea
              name='taskDescription'
              value={formData.taskDescription}
              onChange={handleChange}
              required
              rows='9'
              className='h-full min-h-48 w-full resize-none rounded border border-white/10 bg-[#111] p-3 outline-none focus:border-emerald-500'
              placeholder='Enter task description...'
            />
          </div>

          <button className='rounded bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700'>
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
