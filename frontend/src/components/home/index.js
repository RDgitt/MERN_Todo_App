import React, { useEffect } from 'react'
import AddTodo from '../addtodo'
import Todos from '../todos'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const checkUserLogIn = localStorage.getItem("accessToken");
    if(!checkUserLogIn) {
      navigate('/login')
    }
  }, [])
  return (
    <div className='container my-3'>
     <AddTodo/>
     <Todos/>
    </div>
  )
}

export default Home
