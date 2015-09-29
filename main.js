var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

// io.set('transports', ['websocket'])

app.locals.pretty = true
app.set('view engine', 'jade')
app.use(express.static('public'))

io.on('connection', (socket) => {
  socket.on('setup', (data) => {
    socket.uuid = data.uuid
    io.emit('setup', data)
  })

  socket.on('position', (data) => io.emit('position', data))
  
  socket.on('disconnect', () => io.emit('remove', socket.uuid))
})

app.get('/',       (req, res) => res.render('computer'))
app.get('/device', (req, res) => res.render('device'))

server.listen(3000)
