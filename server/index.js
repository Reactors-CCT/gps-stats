const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server,{});

io.on('connection',socket => {
    socket.on('position', ({latitude, longitude, location}) =>{
        io.emit('position', {latitude, longitude, location})
    });
});

server.listen(3000, function(){
    console.log("Server Started");
});


