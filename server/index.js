const express= require("express");
const socketio = require("socket.io");
const http = require("http");

const {addUser,removeUser,getUser,getUsersInRoom} =require("./users")


const PORT = process.env.PORT || 5000;

const app =express();
const server= http.createServer(app);
const io= socketio(server,{
    cors:{
        origin:"http://127.0.0.1:5173",
        methods:["GET","POST"],
        allowedHeaders:["my-custom-headers"],
        credentials:true
    }
});



io.on("connection",(socket)=>{
    console.log("New user joined!!")
    socket.on("join",(data,callback)=>{
        const {error,user}= addUser({id:socket.id,name:data.name,room:data.roomId,avatar:data.avatar})
        console.log(user)
        if(error){
            return callback(error)
        } 
            
        socket.emit('message',{user:user,text:`${user.name},welcome to the chatroom ${user.room}`})
        socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name}, joined the chat`});
        socket.join(user.room)
        callback()
    });
    socket.on("sendMessage",(message,callback)=>{
        console.log(message)
        const user = getUser(socket.id);

        io.to(user.room).emit("message",{userInfo:user,text:message});
        callback();
    })

    socket.on("disconnect",()=>{
        const user =  getUser(socket.id)
        console.log(`${user}, left the chat`)
    })
})

const router = express.Router();
router.get("/",(req,res)=>{
    res.send(`server is up and running `)
})
app.use(router)

server.listen(PORT, ()=>{console.log(`Server has started on port ${PORT}`)})
