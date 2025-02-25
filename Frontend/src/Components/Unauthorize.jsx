import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorize = () => {
  return (
    <div>
      <h1>Unauthorized User</h1>
     <Link to={"/login"}><button>Back</button></Link> 
    </div>
  )
}

export default Unauthorize
