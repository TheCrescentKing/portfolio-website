/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
/*
 * Code for University of Strathclyde Mobile App Development.
 * Developed by John McMenemy 2019.
 *
 * Code confidential to developer and course examiners.
 *
 */

function Controller(){

    let canvas = O("canvas");
    let view, paddle, ball;
    let isLooping = false;
    let brickArray = [];
    
    this.init = function () {

        controller.initialiseView();
        paddle = new Paddle("Player1", canvas.width/2, canvas.height, "#FFFFFF");
        ball = new Ball(canvas.width/2, canvas.height/2, "#00FFFF");
        brickArray = controller.initialiseBricks();
        if(!isLooping){
            isLooping = true;
            window.requestAnimationFrame(controller.loop);
        }
    };

    this.initialiseBricks = function(){

        //Bricks size of ball
        let brickWidth = ball.getRadius() * 4;
        let numberOfBricksPerRow = Math.floor(canvas.width / brickWidth);
        let spaceToFill = canvas.width - numberOfBricksPerRow * brickWidth;
        brickWidth += Math.floor(spaceToFill / numberOfBricksPerRow);

        let brickHeight = paddle.getHeight();

        let array = new Array(4);

        for (let i = 0; i < array.length; i++) {
            array[i] = new Array(numberOfBricksPerRow);
            for(let j = 0; j < array[i].length; j++){
                array[i][j] = new Brick(j*brickWidth, i*brickHeight, brickWidth, brickHeight, controller.generateRandomColour());
            }
        }

        return array;
    };

    this.generateRandomColour = function(){
            let colourArray = ["#1B60FF", "#FFAA00", "#FF7400"];
            let randomNumber = Math.floor(Math.random() * colourArray.length);
            return colourArray[randomNumber];
    };

    this.initialiseView = function(){
        view = new View();
        view.init();
        view.setMotionListenerFunction(controller.paddleMotionListener);
        view.setClickListenerFunction(controller.startBall);
    };

    this.paddleMotionListener = function(event){
        let x=event.accelerationIncludingGravity.x, y=event.accelerationIncludingGravity.y, z=event.accelerationIncludingGravity.z;

        let pitch =  Math.atan(y/z) * 180 / Math.PI;
        let roll = Math.atan( -x / Math.sqrt(y*y + z*z)) * 180 / Math.PI;

        if(window.innerHeight > window.innerWidth){
            let futurePosition = paddle.getX() + roll;
            if(futurePosition + paddle.getWidth() > canvas.width){
                paddle.setX(canvas.width - paddle.getWidth());
            }else if(futurePosition < 0){
                paddle.setX(0);
            }else {
                paddle.setX(futurePosition);
            }
        }else {
            let futurePosition = paddle.getX() + pitch;
            if(futurePosition + paddle.getWidth() > canvas.width){
                paddle.setX(canvas.width - paddle.getWidth());
            }else if(futurePosition < 0){
                paddle.setX(0);
            }else {
                paddle.setX(futurePosition);
            }
        }
    };

    this.startBall = function(){
        ball.setYVelocity(-5);
        let ms = -5, mx = 5, random;
        do {
            random = (Math.random() * (mx - ms + 1)) + ms;
        } while (random === 0);
        ball.setXVelocity(random);
        view.removeClickListenerFunction(controller.startBall);
    };

    this.loop = function (timestamp) {
        controller.update(timestamp);
        controller.draw();

        window.requestAnimationFrame(controller.loop);
    };

    this.update = function (timestamp) {
        controller.moveBall();
        controller.collisionDetection(paddle);
        controller.ballWallCollision();

        for (let i = 0; i < brickArray.length; i++)
        {
            let previousLength = brickArray[i].length;
            brickArray[i] = brickArray[i].filter(function(brick) {
                return !(controller.collisionDetection(brick));
            });
            let bricksDestroyed = previousLength - brickArray[i].length;
            paddle.setScore(paddle.getScore() + bricksDestroyed);
        }

        let hasWon = true;

        for(let subArray of brickArray){
            if (subArray.length !== 0) {
                hasWon = false;
            }
        }

        if(hasWon){
            controller.stopBall();
            view.showWinScreen();
            view.setClickListenerFunction(controller.resetGame);
        }
    };

    this.draw = function(){
        view.clearCanvas();
        view.drawRectangle(paddle);
        view.drawCircle(ball);

        for(let subArray of brickArray){
            for(let brick of subArray){
                view.drawRectangle(brick);
            }
        }
    }

    this.moveBall = function () {
        ball.setX(ball.getX() + ball.getXVelocity());
        ball.setY(ball.getY() + ball.getYVelocity());
    };

    this.stopBall = function () {
        ball.setXVelocity(0);
        ball.setYVelocity(0);
    };

    this.collisionDetection = function(rectangle) {
        let centerX = rectangle.getX() + rectangle.getWidth()/2;
        let centerY = rectangle.getY() + rectangle.getHeight()/2;

        let distX = Math.abs(ball.getX() - centerX);
        let distY = Math.abs(ball.getY() - centerY);

        // Outside rectangle
        if (distX > (rectangle.getWidth()/2 + ball.getRadius()) || (distY > (rectangle.getHeight()/2 + ball.getRadius()))) {
            return false;
        }

        // Inside rectangle
        if (distX <= (rectangle.getWidth()/2)) {
            ball.setYVelocity(ball.getYVelocity() * -1);
            return true;
        }
        if (distY <= (rectangle.getHeight()/2)) {
            ball.setXVelocity(ball.getXVelocity() * -1);
            return true;
        }

        // Corner collision
        let dx = distX-rectangle.getWidth()/2;
        let dy = distY-rectangle.getHeight()/2;
        if (Math.pow(dx, 2) + Math.pow(dy, 2) <= (Math.pow(ball.getRadius(), 2))) {
            ball.setYVelocity(ball.getYVelocity() * -1);
            ball.setXVelocity(ball.getXVelocity() * -1);
            return true;
        }
    };

    this.ballWallCollision = function () {
        let ballX = ball.getX();
        let ballY = ball.getY();

        // Collision Side Walls
        if (ballX - ball.getRadius() <= 0 || ballX + ball.getRadius() >= canvas.width) {
            if (ball.getXVelocity() < 0){ // Right wall
                ball.setX(ball.getRadius());
            }
            else { // Left wall
                ball.setX(canvas.width - ball.getRadius());
            }
            ball.setXVelocity(ball.getXVelocity() * -1);
        }

        // Collision top wall
        if (ballY - ball.getRadius() <= 0) {
            ball.setY(ball.getRadius());
            ball.setYVelocity(ball.getYVelocity() * -1);
        }

        // Bottom wall
        if (ballY + ball.getRadius() >= canvas.height) {
            controller.stopBall();
            view.showLossScreen(paddle.getScore());
            view.setClickListenerFunction(controller.resetGame);
        }
    };

    this.resetGame = function () {
      controller.init();
      paddle.setScore(0);
      view.hideLossScreen();
      view.hideWinScreen();
      view.removeClickListenerFunction(controller.resetGame);
    };

}

let controller = new Controller();
window.addEventListener("load", controller.init);