import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerHome = () => {
  const Navigate = useNavigate()
  return (
    <div>
      <h1>Welcome to Customer Home Page</h1>
      <button onClick={()=>{localStorage.clear()
        Navigate("/login")
      }}>Log out</button>
    </div>
  )
}

export default CustomerHome
