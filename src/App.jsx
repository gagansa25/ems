import React, { use, useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'

const App = () => {


const[user,setuser]=useState(null)
const [loggeddInUserData, setLoggedInUserData] = useState(null)
const authData = useContext(AuthContext)

// useEffect(()=>{

//   if(authData){
//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
//     if(loggedInUser){
//       setuser(loggedInUser.role)
//     }

//   }
// }, [authData]);
  

const handleLogin=(email,password)=>{
  if(email == 'admin@me.com' && password == '123'){
    setuser('admin')
    localStorage.setItem('loggedInUser', JSON.stringify({role: 'admin'}))
  }else if(authData){
    const employee = authData.employees.find((e) => e.email == email && e.password == password)
    if(employee){
      setuser('employee')
      localStorage.setItem('loggedInUser', JSON.stringify({role: 'employee'}))
    }
  }
  else{
    alert("Invalid Credentials")
  }
}
 
  

return (
  
  <div>
    {!user ? <Login handleLogin={handleLogin} />: ''}
    {user == 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
  </div>
)
  }



export default App