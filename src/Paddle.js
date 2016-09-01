import settings from './settings';
const victorySound = new Audio('../sounds/pong-02.wav');


export default class Paddle {
    constructor(boardWidth, boardHeight, x, control, score) {
        this.width = settings.paddleWidth;
        this.height = settings.paddleHeight;
        this.x = x;
        this.y = (boardHeight / 2) - (this.height / 2);
        this.speed = settings.paddleSpeed;
        this.maxHeight = boardHeight;
        this.maxWidth = boardWidth;
        this.score = score;

        document.body.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case control.up:
                    this.y = Math.max(
                        0,
                        this.y - this.speed
                    );
                    break;

                case control.down:
                    this.y = Math.min(
                        this.maxHeight - this.height,
                        this.y + this.speed
                    );
                    break;
            }
        });
    }
//Method to add the score
    addScore() {
        this.score.score++;
        victorySound.play();
    }

//Render the paddles
    render(ctx, color) { // What is ctx? Where does it come from?
        ctx.fillStyle = color;
        ctx.fillRect(
            this.x, this.y,
            this.width, this.height
        );

    }
}