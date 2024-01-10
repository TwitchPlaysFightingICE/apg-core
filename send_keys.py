import sys
import pyautogui
import pydirectinput
import time

# Map commands to their respective keyboard characters/actions
command_map = ["a", "d", "s", "q", "w", "e"]
move_map = ["a", "d"]
spMove_map = ["a-", "d-"]
item_map = ["s", "q", "w", "e"]

# Retrieve the command passed from Node.js
key = sys.argv[1]

# Simulate keyboard input using pyautogui
if key in item_map or key in move_map:
    pydirectinput.keyDown(key)
    time.sleep(0.1)  # Adjust the duration if needed
    pydirectinput.keyUp(key)
elif any(key.startswith(prefix) for prefix in spMove_map):
    for k in key:
        if k in command_map:
            pydirectinput.keyDown(k)
            time.sleep(0.5)  # Adjust the duration if needed
            pydirectinput.keyUp(k)
else:
    print(f"Command '{key}' not recognized.")