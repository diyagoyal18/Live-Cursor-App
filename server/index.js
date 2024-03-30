const http= require('http');
const {WebSocketServer}= require('ws')
const url = require('url')
const uuidv4= require('uuid').v4
const server= http.createServer()

const wsServer= new WebSocketServer({server})
const port= 8000

const connections= {}
const users= {}

const broadcast= ()=>{
    Object.keys(connections).forEach(uuid=>{
        const connection= connections[uuid]
        const message= JSON.stringify(users)
        connection.send(message)
    })
}

//message= state
const handleMessage= (bytes, uuid)=>{
    const message= JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state=message
    broadcast()
    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)
}
const handleClose= uuid =>{
    console.log(`${users[uuid].username} disconnected`)
    delete connections[uuid]
    delete users[uuid]

    broadcast()
}


wsServer.on('connection',(connection,request)=>{
     //ws://localhost:8000?username=Diya
    const {username}= url.parse(request.url, true).query
    const uuid = uuidv4()
    console.log(username)
    console.log(uuid)

    connections[uuid]= connection

    users[uuid]={
        username,
        state:{ }
    }
    connection.on("message", message=> handleMessage(message, uuid)) //capturing the value of variable so that everytime a user enters we get the message as well as the uuid
    connection.on("close", ()=>handleClose(uuid))
     //json.stringify(user)
})

server.listen(port, ()=>{
    console.log("Websocket server is running on port 8000")
})