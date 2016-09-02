import settings from './settings';
const wallSound = new Audio('http://www.freesound.org/data/previews/4/4391_4948-lq.mp3');
const paddleSound = new Audio('http://www.freesound.org/data/previews/4/4390_4948-lq.mp3');
export default class Ball {
    constructor(boardWidth, boardHeight) {
        this.x = boardWidth / 2;
        this.y = boardHeight / 2;
        this.vy = Math.floor(Math.random() * 12 - 6);
        this.vx = (7 - Math.abs(this.vy));
        this.radius = settings.ballRadius;
        this.maxHeight = boardHeight;
    }
//Draw the ball
    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
//Method when ball passes left or right sides of canvas
    goal(width, height) {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.floor(Math.random() * 12 - 6);
        this.vy = -this.vy;
    }
//Method when ball hits top and bottom of the canvas
    wallBounce(ctx, player1, player2) {
        if (this.y - this.radius < 0 || this.y + this.radius > this.maxHeight) {
            this.vy *= -1;
            wallSound.play();
        };
    }
//Method when ball hits either paddles
    paddleCollision(player1, player2) {
        if (this.vx > 0) {
            const inRightEnd = player2.x <= this.x + this.radius &&
                player2.x > this.x - this.vx + this.radius;
            if (inRightEnd) {
                const collisionDiff = this.x + this.radius - player2.x;
                const k = collisionDiff / this.vx;
                const y = this.vy * k + (this.y - this.vy);
                const hitRightPaddle = y >= player2.y && y + this.radius <= player2.y + player2.height;
                if (hitRightPaddle) {
                    paddleSound.play();
                    this.x = player2.x - this.radius;
                    this.y = Math.floor(this.y - this.vy + this.vy * k);
                    this.vx = -this.vx;

                }
            }
        } else {
            const inLeftEnd = player1.x + player1.width >= this.x;
            if (inLeftEnd) {
                const collisionDiff = player1.x + player1.width - this.x;
                const k = collisionDiff / -this.vx;
                const y = this.vy * k + (this.y - this.vy);
                const hitLeftPaddle = y >= player1.y && y + this.radius <= player1.y + player1.height;
                if (hitLeftPaddle) {
                    paddleSound.play();
                    this.x = player1.x + player1.width;
                    this.y = Math.floor(this.y - this.vy + this.vy * k);
                    this.vx = -this.vx;

                }
            }
        }
    }
//Draws the ball and calls methods
    render(ctx, color, player1, player2, width, height) {
        this.draw(ctx, color);
        this.wallBounce(ctx, player1, player2);
        this.paddleCollision(player1, player2);
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) {
            player2.addScore();
            this.goal(width, height);

        } else if (this.x > width) {
            player1.addScore();
            this.goal(width, height);

        }
    }
}