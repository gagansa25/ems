import React, { useState } from 'react'

const Login = ({handleLogin}) => {

  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) =>{
    e.preventDefault()
    handleLogin(email,password)
    setEmail('')
    setPassword('')
  }

  return (
    <div className='w-full'>
      <div className='rounded-xl border border-emerald-600 bg-[#171717] p-8 shadow-2xl shadow-black/30 md:p-10'>
        <h2 className='mb-6 text-2xl font-semibold text-white'>Login</h2>

        <form
          onSubmit={submitHandler}
          className='flex flex-col'
        >

          <input
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            className='outline-none bg-transparent border-2 border-emerald-600 text-lg py-3 px-5 rounded-lg placeholder:text-gray-400'
            type="email"
            placeholder="Enter your email"
          />

          <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
            className='outline-none bg-transparent border-2 border-emerald-600 text-lg py-3 px-5 rounded-lg mt-3 placeholder:text-gray-400'
            type="password"
            placeholder="Enter password"
          />

          <button className='mt-5 text-white bg-emerald-600 text-lg font-semibold py-3 px-5 rounded-lg hover:bg-emerald-700'>
            Log in
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login
