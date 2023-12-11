require("dotenv").config()

const io = require("socket.io-client")
const socket = io("ws://localhost:3000")

const tmi = require("tmi.js")
const { exec } = require("child_process")
// Replace with your Twitch channel, bot username, and OAuth token
const channelName = process.env.CHANNEL_NAME
const botUsername = process.env.BOT_USERNAME
const oauthToken = process.env.TWITCH_OAUTH_TOKEN

const client = new tmi.Client({
  options: { debug: true },
  connection: { reconnect: true },
  identity: {
    username: botUsername,
    password: oauthToken,
  },
  channels: [channelName],
})

const cmd = ["a", "d", "a-", "d-", "s", "q", "w", "e"]

client.connect()

client.on("message", async (channel, tags, message, self) => {
  // Ignore messages from the bot itself
  if (!self) {
    const lowercasedMessage = message.toLowerCase()
    if (lowercasedMessage === "s") {
      const messageData = {
        timestamp: new Date(),
        displayName: tags["display-name"],
        command: lowercasedMessage,
      }
      console.log(messageData)
      socket.emit("commandS", messageData) // Emitting "commandS" event through Socket.IO
    } else if (cmd.includes(lowercasedMessage)) {
      const messageData = {
        timestamp: new Date(),
        displayName: tags["display-name"],
        command: lowercasedMessage,
      }
      console.log(messageData)
      socket.emit("chatMessage", messageData) // Emitting chat message through Socket.IO
    }
  }
})
