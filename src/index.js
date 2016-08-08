import './game.css';
import Game from './Game.js';


// game instance  
var game = new Game();
const fps = 30;

function gameLoop() {
  setTimeout(gameLoop, fps);
  game.render();
}
gameLoop();
