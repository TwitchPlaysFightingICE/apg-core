# TwitchPlaysFightingICE: APG Core

The APG core is responsible the functionality behind the scenes. The core handles reading chat inputs, command processing, updating _overlay_, etc.

The overlay displays all the meta information about the game such as commands, game information, and the current time. The overlay composited, using OBS, with emulator screen capture or video capture devices hence the name "overlay".

## Main functions

- Connecting to Twitch Chat and handling all interactions (e.g. commands)
- Driving the overlay you see on stream
- Driving external programs like emulators
