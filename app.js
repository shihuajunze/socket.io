const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.info("访问地址为 http://"+ host + ":" + port);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//缓存聊天记录
let msgs = [];

io.on('connection', function (socket) {
	socket.emit('message', msgs);
  socket.on('sendMessage', function (data) {
  	data.createAt = new Date();
  	msgs.push(data);
  	console.log(data);
  	//群发
    io.sockets.emit('message', data);
  });
});