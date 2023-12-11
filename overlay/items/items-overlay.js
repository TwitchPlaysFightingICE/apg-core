const images = [
  "./img/sushi.png",
  "./img/energy.png",
  "./img/fireball.png",
  // Add more image URLs here
]

const itemCommands = ["w", "e", "q"]

let shuffledSequence = []

function generateSequence() {
  // Create a sequence of images that ensures each item appears at least once within every 6-item cycle
  const repeatedImages = images.concat(images.slice(0, 6 - (images.length % 6))) // Ensure the sequence is multiple of 6
  shuffledSequence = repeatedImages.sort(() => Math.random() - 0.5)
}

function displayImages() {
  if (shuffledSequence.length == 2) {
    const repeatedImages = images.concat(
      images.slice(0, 6 - (images.length % 6))
    ) // Ensure the sequence is multiple of 6
    shuffledSequence = shuffledSequence.concat(
      images.concat(repeatedImages.sort(() => Math.random() - 0.5))
    )
  }

  document.getElementById("image1").src = shuffledSequence[0]
  document.getElementById("image2").src = shuffledSequence[1]
}

generateSequence() // Generate the initial sequence
displayImages() // Initial display

// Establish a Socket.IO connection to the server
const socket = io("ws://localhost:3000")

// Log socket connection status
socket.on("connect", () => {
  console.log("Connected to Socket.IO server")
})

// Listening for the "commandS" event from the bot
socket.on("commandS", () => {
  shuffledSequence.shift()
  console.log(`Send ${shuffledSequence[0]} to game`)
  console.log(itemCommands[images.indexOf(shuffledSequence[0])])
  displayImages() // Call displayImages() to update the displayed images
})

// Log any errors
socket.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error)
})
