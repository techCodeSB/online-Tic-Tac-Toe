const express = require("express");
const app = express();
const io = require("socket.io");

app.use(express.static(__dirname+"/otherFiles"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

const server = app.listen(8080, ()=>{
    console.log("server run...");
})

//000----------- socket programming start ---------000
const socketIo = io(server);

socketIo.on("connection", (socket)=>{
    // console.log("incoming connection listen.....");

    socket.on("new-join", (room)=>{
        socket.join(room);

        socket.on("username", data=>{
            let obj = JSON.parse(data);
            socket.broadcast.to(obj.room).emit("join-user", obj.user);
        })

        socket.on("x-trigerd", data=>{
            let obj = JSON.parse(data);
            socket.broadcast.to(obj.room).emit("x-fire", obj.class);
        })

        socket.on("0-trigerd", data=>{
            let obj = JSON.parse(data);
            socket.broadcast.to(obj.room).emit("0-fire", obj.class);
        })
    })
    
})

