import socketIo from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()

const server = http.createServer(app)

const io = socketIo(server)

app.get('/', ((req, res) => {
  res.send('hey')
}))

server.listen(7777, () => {
  console.log('listening on 7777')
})

const messages: string[] = []

io.on('connection', client => {
  io.emit('serverMessage', messages)
  client.on('clientMessage', message => {
    messages.push(message)
    io.emit('serverMessage', messages)
  })
  client.on('clientDelete', index => {
    messages.splice(index, 1)
    io.emit('serverMessage', messages)
  })

  client.on('clientDraw', data => {
    io.emit('serverDraw', data)
  })
  client.on('clientDrawDelete', () => {
    io.emit('serverDrawDelete')
  })
  client.on('mouseDown', () => io.emit('mouseDown'))
  client.on('mouseUp', () => io.emit('mouseUp'))
})