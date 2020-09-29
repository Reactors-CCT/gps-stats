const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server,{});

var SOCKET_LIST = [];
var locationsList = [];
var stats = [];

io.on('connection',socket => {

    SOCKET_LIST.push(socket);
    socket.emit('newStats',stats);

    socket.on('sendData',({loc})=>{   
        let found = false;
        if(stats.length>0){
            for(var i=0; i< stats.length; i++){                
                if(stats[i].location == loc){
                    stats[i].counter = stats[i].counter+1;
                    found = true;
                    break;
                } else { 
                    found = false;
                }
            }
            if(!found){
                stats.push({location: loc, counter: 1});
            }
        } else {
            stats.push({location: loc, counter: 1});
        }
        socket.emit('newStats',stats);
    });
});

setInterval(()=>{
    for(var i=0; i<SOCKET_LIST.length; i++){
        SOCKET_LIST[i].emit('newUser',stats);
    }
});

server.listen(3000, function(){
    console.log("Server Started");
});


