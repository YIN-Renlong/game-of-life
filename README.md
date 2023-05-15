[![Visit GitHub Page](https://img.shields.io/badge/Visit-GitHub%20Page-blue?logo=github)](https://yin-renlong.github.io/game-of-life/)

# A study of Conway's Game of Life

This is a simple script that creates a Conway's Game of Life-based animation of text on a grid of LED lights. The main text is initially displayed on the LED grid, and after 15 seconds, it starts to disintegrate into a Game of Life pattern. The animation stops after 17 seconds.

![alt text](https://raw.githubusercontent.com/YIN-Renlong/game-of-life/7c436984248d0d4841b746505317f8401495f13b/Schermata%202023-05.png?raw=true)


## How to Use

Simply open the script in a p5.js editor or embed it in an HTML file with the p5.js library included. The animation will automatically start when the page is loaded.

## Code Explanation

The code creates an LED grid based on the size of the browser window and initializes the grid with the main text. After 15 seconds, the text starts to disintegrate and follows the rules of Conway's Game of Life. The animation stops after 17 seconds.

### Main Functions

- `calculateGridSize()`: Calculates the grid size based on the window dimensions.
- `windowResized()`: Resizes the canvas when the window is resized.
- `draw_character()`: Draws a character on the matrix.
- `gameOfLifeUpdate()`: Updates the grid based on the rules of Conway's Game of Life.
- `displayGrid()`: Displays the grid on the canvas.
- `isTextCell()`: Checks if a cell is part of the text.
- `countTextNeighbors()`: Counts the number of text neighbors a cell has.

For more details, please refer to the code comments.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).

## Credit

This app was created by by [[YIN Renlong](https://github.com/YIN-Renlong)]. - Feel free to use and modify this code for your projects, but please give credit to the original author.

## Acknowledgement

Article ["Will AIs Take All Our Jobs and End Human History—or Not? Well, It’s Complicated…" ](https://writings.stephenwolfram.com/2023/03/will-ais-take-all-our-jobs-and-end-human-history-or-not-well-its-complicated/) of Stephen Wolfram served as a source of inspiration, so many thanks!

