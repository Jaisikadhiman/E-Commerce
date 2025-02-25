import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/slice/userSlice'

const CompanyHome = () => {
  const Navigate = useNavigate()
const dispatch = useDispatch()
  return (
    <div>
      <h1>Welcome to Company Home Page</h1>
      <button onClick={()=>{localStorage.clear()
      dispatch(loginUser(''))
        Navigate("/login")
      }}>Log out</button>
    </div>
  )
}

export default CompanyHome
