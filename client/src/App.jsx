import { useState } from 'react'
import {Login} from './components/Login'
import {Home} from './components/Home'

function App() {
  const [username, setUsername]= useState("")
  
  return username? 
    <Home username={username}/>
  :
    <Login onSubmit={setUsername}/>
  
  
  
  
  // return (
  //   <>
  //    <Login onSubmit={setUsername}></Login>
  //   </>
  // )
}

export default App
