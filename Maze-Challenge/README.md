# Kenzie Academy Challenge: Maze

Follow the instructions provided on my.kenzie.academy for this challenge. The `code.js` file is a placeholder. Feel free to rename it add additional files to the project.

Customize this README.md however you want to turn it into documentation for your project (including deleting these opening paragraphs). The only required sections are the **Project Plan** and **Reflection** below. Be sure to use proper Markdown syntax in this file (here's a [cheatsheet PDF](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) of the basic syntax).

## Project Plan

_(Put your project plan here. It could be pseudocode, an outline-style development plan, etc. But whatever form you choose, it should be detailed enough that another developer could feasibly use it to implement your solution.)_

Initialization: 
  set currentMaze to sokobanMap1
  set playerPosition to null
  set winMessage to false

Build a function to createMaze by manipulating the DOM
  -append each cell to the document 

  Call updatePlayerPosition

Build a function to updatePlayerPosition
  mazeElement = document.getElementById("maze")
  playerElement = mazeElement.querySelector(".cell.P")

  if playerElement exists:
    Remove "P" class from playerElement

  playerIndex = Calculate index based on playerPosition and maze dimensions
  newPlayerElement = Get the element at playerIndex in mazeElement
  Add "P" class to newPlayerElement

Buils a function to movePlayer
  newPosition = Clone of playerPosition

  Function movePlayer(direction):
  newPosition = Clone of playerPosition

  switch direction:
    if "up":
      Set newPosition.row to playerPosition.row - 1
      break
    if "down":
      Set newPosition.row to playerPosition.row + 1
      break
    if "left":
      Set newPosition.col to playerPosition.col - 1
      break
    if "right":
      Set newPosition.col to playerPosition.col + 1
      break
    default:
      Return without making any changes

  if newPosition is within maze bounds:
    newCell = Get the cell content at newPosition in currentMaze

    if newCell is not a wall ("W"):
      playerPosition = newPosition
      Call updatePlayerPosition()

      if newCell is not a wall:
        if moving vertically:
          Set newPosition.col to playerPosition.col
        else if moving horizontally:
          Set newPosition.row to playerPosition.row

        updatedCell = Get the cell content at newPosition in currentMaze
        playerPosition = newPosition
        Call updatePlayerPosition()

        if updatedCell is the finish point ("F"):
          Call showWinMessage()

Build a function to handleKeyPress
  switch event.key:
    case "ArrowUp":
      Call movePlayer("up")
      break
    case "ArrowDown":
      Call movePlayer("down")
      break
    case "ArrowLeft":
      Call movePlayer("left")
      break
    case "ArrowRight":
      Call movePlayer("right")
      break
    default:
      break

Build a function to changeMap
  currentMaze = Toggle between sokobanMap1 and sokobanMap2
  Call createMaze()

Build a function to showWinMessage
  if winMessage is false:
    winMessageElement = Create a new h1 element
    winMessageElement.id = "winMessage"
    winMessageElement.textContent = "You won!"

    Append winMessageElement to document body

    winMessage = true

  winMessageElement = Get the element with id "winMessage"
  Set winMessageElement display style to "block"

Listener:
  Call createMaze()
  Add event listener for keydown event, calling handleKeyPress

## Reflection

What different approaches or techniques did you consider when planning your implementation? What were the advantages and disadvantages of those alternatives?

I definitely struggled with this challenge. In my first versions of the code, my board piece moved as it should, but when I would switch to the 2nd map, my board piece would move diagonally and through walls. I never did figure out why exactly that was happening, but my 2nd map had different dimensions than the 1st map, and in the end I decided to make them the same dimensions to make it easier for the rules to apply to both boards. I believe it had something to do with the way that my board was rendering. I had to dig through a lot of old code to research ways to move around a boardgame and keep the player from moving off out of the bounds. In the end I think it turned out okay.  


# Resources: 
 - Received some guidance on moving game piece/rendering the board from friend/developer Jordan Roberts 