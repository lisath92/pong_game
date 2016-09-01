//Playing the game
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import settings from './settings';
import ScoreBoard from './ScoreBoard';
const gap = settings.gap;
var p1Keys = settings.p1Keys;
var p2Keys = settings.p2Keys;
var p1Score = settings.p1Score;
var p2Score = settings.p2Score;

export default class Game {
    constructor() {
        const canvas = document.getElementById('game');
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = 'white';
        this.board = new Board(this.width, this.height);
        this.score1 = new ScoreBoard(...p1Score);
        this.score2 = new ScoreBoard(...p2Score);
        this.player1 = new Paddle(this.width, this.height, gap, p1Keys, this.score1);
        this.player2 = new Paddle(this.width, this.height, this.width - 4 - gap, p2Keys, this.score2);
        this.ball1 = new Ball(this.width, this.height);
        this.ballsArr = [];
        this.gamePaused = false;

        document.body.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case p1Keys.addBalls:
                case p2Keys.addBalls:
                    this.addBalls();
                    break;

                case p1Keys.ballSize:
                case p2Keys.ballSize:
                    this.ball1.radius = Math.floor(Math.random() * (9 - 5) + 5);
                    break;
            }
        });
    }

//Method to add more balls
    addBalls() {
        for (var i = 0; i < 5; i++) {
            let ball = new Ball(this.width, this.height);
            ball.vy = Math.floor(Math.random() * 12 - 6);
            ball.vx = (7 - Math.abs(ball.vy));
            this.ballsArr.push(ball);
        }
    }

//Method to change ball colors
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var x = 0; x < 6; x++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
//Render the game itself and call methods
    render() {
        this.board.render(this.context);
        this.player1.render(this.context, 'yellow');
        this.player2.render(this.context, 'blue');
        this.score1.render(this.context);
        this.score2.render(this.context);
        this.ball1.render(this.context, 'navy', this.player1, this.player2, this.width, this.height);

        this.ballsArr.forEach((value) => {
            value.render(this.context, this.getRandomColor(), this.player1, this.player2, this.width, this.height);
        });

    }
}