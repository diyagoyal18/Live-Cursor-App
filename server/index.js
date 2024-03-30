const { log } = require('console');
const http= require('http');
const {WebSocketServer}= require('ws')
const url = require('url')
const server= http.createServer()

const wsServer= new WebSocketServer({server})
const port= 8000

wsServer.on('connection',(connection,request)=>{
     //ws://localhost:8000
    const {username}= url.parse(request.url, true).query
    console.log(username)
})

server.listen(port, ()=>{
    console.log("Websocket server is running on port 8000")
})