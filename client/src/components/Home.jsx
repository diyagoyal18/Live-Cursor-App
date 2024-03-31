  import {useEffect, useRef} from 'react'
  import throttle from 'lodash.throttle'
import useWebSocket from 'react-use-websocket'
import {Cursor} from './Cursor'

const renderCursors= users=>{
  return Object.keys(users).map(uuid=>{
    const user= users[uuid]
    return <Cursor key={uuid} point={[user.state.x, user.state.y]}/>
  })
}
const renderUsersList= users=>{
  return (
    <ul>
      {Object.keys(users).map(uuid=>{
        return <li key={uuid}>{JSON.stringify(users[uuid])}</li>
      })}
    </ul>
  )
}

export function Home({username})  {
  const WS_URL= 'ws://127.0.0.1:8000'
  const {sendJsonMessage, lastJsonMessage}= useWebSocket(WS_URL, {
    queryParams: {username}
  })

const THROTTLE= 30
const sendJsonMessageThrottled= useRef(throttle(sendJsonMessage, THROTTLE))

  useEffect(()=>{
    // ask the server to everyone send their state the second we load the component
    sendJsonMessage({
      x:0,
      y:0
    })
    window.addEventListener("mousemove", e=>{
      sendJsonMessageThrottled.current({
        
       x: e.clientX,
       y: e.clientY
      })
    })
  },[ ])
 
      if(lastJsonMessage){
        return <>
        {renderCursors(lastJsonMessage)}
        {renderUsersList(lastJsonMessage)}
        </>
      }
      return (
        <div>
      <h1>Hello , {username}</h1>
    </div>
  )
}


