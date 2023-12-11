const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for Socket.IO
  },
})

io.on("connection", (socket) => {
  console.log("Client connected")

  // Receiving chat messages from Twitch bot and broadcasting to clients
  socket.on("chatMessage", (message) => {
    console.log("Received chat message:", message)
    io.emit("chatMessage", message) // Broadcasting the chat message to all clients
    if (message.command === "s") {
      io.emit("commandS", message)
    }
  })

  socket.on("itemSelection", (message) => {
    console.log("Received item selection command:", message)
    io.emit("itemSelectionPy", message) // Broadcasting the item selection command to all clients
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

const PORT = process.env.WS_PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
