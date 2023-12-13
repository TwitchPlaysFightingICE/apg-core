// twitchChatOverlay.js
// Keep track of the commands
const predefinedColors = [
  "Red",
  "Blue",
  "Green",
  "Firebrick",
  "Coral",
  "Goldenrod",
  "BlueViolet",
  "Chocolate",
  "CadetBlue",
  "YellowGreen",
  "SeaGreen",
  "DodgerBlue",
  "SpringGreen",
  "OrangeRed",
  "HotPink",
]

let userColors = {} // Object to store user-color mapping

const commandHistory = []

let latestCommandTimeout // Declare a variable to store the timeout

// Function to update the overlay with new command
function updateOverlay(displayName, command) {
  const upperCasedCommand = command.toUpperCase()
  const overlayContainer = document.getElementById("overlay")
  const commandElement = document.createElement("p")
  commandElement.className = "command"

  let userColor = userColors[displayName] // Check if user has a color assigned

  if (!userColor) {
    // If the user doesn't have a color assigned, assign the next color from the list
    userColor =
      predefinedColors[Object.keys(userColors).length % predefinedColors.length]
    userColors[displayName] = userColor // Store the color for the user
  }

  const displayNameSpan = document.createElement("span")
  displayNameSpan.className = "display-name"
  displayNameSpan.style.color = userColor
  displayNameSpan.textContent = displayName

  const userCommandSpan = document.createElement("span")
  userCommandSpan.className = "user-command"
  userCommandSpan.innerHTML = upperCasedCommand

  commandElement.appendChild(displayNameSpan)
  commandElement.appendChild(userCommandSpan)

  commandHistory.unshift(commandElement)

  // Display only the last 20 commands
  if (commandHistory.length > 20) {
    const removedCommand = commandHistory.pop()
    overlayContainer.removeChild(removedCommand)
  }

  // Remove transitional class from the previous latest command
  const previousLatestCommand =
    overlayContainer.querySelector(".latest-command")
  if (previousLatestCommand) {
    previousLatestCommand.classList.remove("latest-command")
  }

  // Clear existing timeout (if any) to reset the opacity change timer
  clearTimeout(latestCommandTimeout)

  // Highlight the new latest command
  commandElement.classList.add("latest-command")

  overlayContainer.appendChild(commandElement)

  // Trigger the transition for the 20th command
  if (commandHistory.length === 20) {
    setTimeout(() => {
      commandHistory[20].classList.remove("latest-command")
    }, 1000) // Adjust the delay as needed
  }

  // Set a timeout to change opacity back to 0 if no new insert within 3 seconds
  latestCommandTimeout = setTimeout(() => {
    const latestCommand = overlayContainer.querySelector(".latest-command")
    if (latestCommand) {
      latestCommand.style.backgroundColor = "rgba(222, 222, 222, 0)"
      latestCommandTimeout = null // Reset the timeout variable
    }
  }, 3000) // Change the opacity back after 3 seconds
}

// Establish a Socket.IO connection to the server
const socket = io("ws://localhost:3000")

// Log socket connection status
socket.on("connect", () => {
  console.log("Connected to Socket.IO server")
})

// Log incoming chat messages from the server
socket.on("chatMessage", (message) => {
  console.log("Received chat message:", message)
  updateOverlay(message.displayName, message.command)
})

// Log any errors
socket.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error)
})
